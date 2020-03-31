import {
  actionOidcRegister,
  actionOidcRegisterSuccess,
  actionApiUserAddUserSuccess,
  actionApiUserAddUserFail
} from './auth.actions';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {createEffect, ofType, Actions} from '@ngrx/effects';
import {tap, switchMap, concatMap, catchError, map} from 'rxjs/operators';
import {OidcActions, OidcFacade} from 'ng-oidc-client';
import {environment} from '@env/environment';
import {of} from 'rxjs';
import {UserService} from '@services/user.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private oidcFacade: OidcFacade,
    private userService: UserService
  ) {}

  userSignedOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OidcActions.OidcActionTypes.OnUserSignedOut),
        tap(() => this.router.navigate(['/']))
      ),
    {dispatch: false}
  );

  register$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionOidcRegister),
        tap(() => {
          const returnUrl = `${environment.thisUri}/register-callback`;
          window.location.href = `${environment.authServerUri}/Identity/Account/Register?ReturnUrl=${returnUrl}`;
        })
      ),
    {dispatch: false}
  );

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionOidcRegisterSuccess),
      switchMap(() => this.oidcFacade.getUserManager().signinSilent()),
      tap(() => this.router.navigate(['/'])),
      concatMap(() =>
        this.userService.addNewUser().pipe(
          map(() => actionApiUserAddUserSuccess()),
          catchError(error => of(actionApiUserAddUserFail({error})))
        )
      )
    )
  );
}

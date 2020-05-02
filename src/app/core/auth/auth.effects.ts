import {actionOidcRegister, actionOidcRegisterSuccess, actionApiUserAddUserSuccess, actionApiUserAddUserFail} from './auth.actions';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {createEffect, ofType, Actions} from '@ngrx/effects';
import {tap, switchMap, concatMap, catchError, map, withLatestFrom} from 'rxjs/operators';
import {OidcActions, OidcFacade} from 'ng-oidc-client';
import {environment} from '@env/environment';
import {of} from 'rxjs';
import {UserService} from '@services/user.service';
import {MessageService} from 'primeng/api';
import {LocalStorageService} from '@core/local-storage/local-storage.service';
import {Store, select} from '@ngrx/store';
import {ɵa as OidcState} from 'ng-oidc-client';
import {selectOidcState} from './auth.selectors';

export const OIDC_KEY = 'OIDC';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<OidcState>,
    private router: Router,
    private oidcFacade: OidcFacade,
    private userService: UserService,
    private messageService: MessageService,
    private localStorageService: LocalStorageService
  ) {}

  persistUser$$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OidcActions.UserDoneLoading),
        withLatestFrom(this.store.pipe(select(selectOidcState))),
        tap(([, oidc]) => this.localStorageService.setItem(OIDC_KEY, oidc))
      ),
    {dispatch: false}
  );

  userSigningOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OidcActions.SignOutRedirect),
        tap(() => {
          this.localStorageService.clearState();
        })
      ),
    {dispatch: false}
  );

  userSignedOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OidcActions.OnUserSignedOut),
        tap(() => {
          this.localStorageService.clearState();
          this.router.navigate(['/']);
        })
      ),
    {dispatch: false}
  );

  oidcDisplayError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OidcActions.SignInError, OidcActions.OidcError),
        tap(({payload}) =>
          this.messageService.add({
            severity: 'error',
            summary: 'Auth error',
            detail: payload
          })
        )
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
      tap(() => this.router.navigate(['app'])),
      concatMap(() =>
        this.userService.addNewUser().pipe(
          map(() => actionApiUserAddUserSuccess()),
          catchError(error => of(actionApiUserAddUserFail({error})))
        )
      )
    )
  );
}

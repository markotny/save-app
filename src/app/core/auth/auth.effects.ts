import * as AuthActions from './auth.actions';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {createEffect, ofType, Actions} from '@ngrx/effects';
import {tap, catchError, withLatestFrom, switchMapTo, mapTo, switchMap} from 'rxjs/operators';
import {OidcActions, OidcFacade} from 'ng-oidc-client';
import {of, from} from 'rxjs';
import {AuthService} from '@core/auth/auth.service';
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
    private authService: AuthService,
    private messageService: MessageService,
    private localStorageService: LocalStorageService
  ) {}

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        tap(() => this.oidcFacade.signinRedirect())
      ),
    {dispatch: false}
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      switchMap(() =>
        from(this.oidcFacade.getUserManager().signinRedirectCallback()).pipe(
          mapTo(AuthActions.ensureRegistered()),
          catchError(error => of(OidcActions.OidcError({payload: error.message})))
        )
      )
    )
  );

  register$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.register),
        tap(() => this.authService.register())
      ),
    {dispatch: false}
  );

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerSuccess),
      switchMap(() =>
        from(this.oidcFacade.getUserManager().signinSilent()).pipe(
          mapTo(AuthActions.ensureRegistered()),
          catchError(error =>
            error.message === 'login_required' ? of(AuthActions.login()) : of(OidcActions.OidcError({payload: error.message}))
          )
        )
      )
    )
  );

  ensureRegistered$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.ensureRegistered),
      switchMapTo(
        this.authService.ensureRegistered().pipe(
          mapTo(AuthActions.ensureRegisteredSuccess()),
          catchError((error: Error) => of(AuthActions.ensureRegisteredFailure({payload: error.message})))
        )
      )
    )
  );

  logoutOnFailedRegisteredCheck$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.ensureRegisteredFailure),
        tap(() => {
          this.messageService.add({
            severity: 'warn',
            summary: 'User registration failed',
            detail: 'You will be automatically signed out in 5 seconds.',
            closable: false,
            sticky: true
          });
          setTimeout(() => this.oidcFacade.signoutRedirect(), 5000);
        })
      ),
    {dispatch: false}
  );

  cacheUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OidcActions.UserDoneLoading),
        withLatestFrom(this.store.pipe(select(selectOidcState))),
        tap(([, oidc]) => this.localStorageService.setItem(OIDC_KEY, oidc))
      ),
    {dispatch: false}
  );

  clearCachedUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OidcActions.SignOutRedirect, OidcActions.OnUserSignedOut),
        tap(() => this.localStorageService.clearState())
      ),
    {dispatch: false}
  );

  redirectToApp$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.ensureRegistered),
        tap(() => this.router.navigate(['app']))
      ),
    {dispatch: false}
  );

  redirectToHome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OidcActions.OnUserSignedOut, OidcActions.OidcError),
        tap(() => this.router.navigate(['/']))
      ),
    {dispatch: false}
  );

  displayOidcError$ = createEffect(
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
}

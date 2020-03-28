import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {createEffect, ofType, Actions} from '@ngrx/effects';
import {tap} from 'rxjs/operators';
import {OidcActions} from 'ng-oidc-client';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router) {}

  userSignedOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OidcActions.OidcActionTypes.OnUserSignedOut),
        tap(() => this.router.navigate(['/']))
      ),
    {dispatch: false}
  );
}

import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {createEffect, ofType, Actions} from '@ngrx/effects';
import {OidcActionTypes} from 'ng-oidc-client/lib/actions/oidc.action';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router) {}

  userSignedOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OidcActionTypes.OnUserSignedOut),
        tap(() => this.router.navigate(['/']))
      ),
    {dispatch: false}
  );
}

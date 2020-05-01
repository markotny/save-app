import {Injectable} from '@angular/core';
import {OidcFacade} from 'ng-oidc-client';
import {map, share} from 'rxjs/operators';
import {environment} from '@env/environment';
import {of, Observable} from 'rxjs';
import {Profile} from 'oidc-client';
import {Store} from '@ngrx/store';
import {actionOidcRegister} from './auth.actions';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mock: Partial<Profile> = {
    name: 'test'
  };

  constructor(private oidcFacade: OidcFacade, private store: Store, private router: Router) {}

  user$: Observable<Profile | Partial<Profile>> = environment.mockUser
    ? of({...this.mock})
    : this.oidcFacade.identity$.pipe(
        map(user => (user && !user.expired ? user.profile : null)),
        share()
      );

  userName$: Observable<string> = this.user$.pipe(map(user => (user ? user.name : null)));

  login() {
    environment.mockUser ? this.router.navigate(['app']) : this.oidcFacade.signinRedirect();
  }

  register() {
    this.store.dispatch(actionOidcRegister());
  }
}

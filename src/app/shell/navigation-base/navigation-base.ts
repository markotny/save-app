import {actionOidcRegister} from '@core/auth/auth.actions';
import {Store} from '@ngrx/store';
import {OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {share, map} from 'rxjs/operators';
import {OidcFacade} from 'ng-oidc-client';

export class NavigationBase implements OnInit {
  exampleMenuLinks = [
    {name: 'Example 1', route: '/'},
    {name: 'Example 2', route: '/'}
  ];

  accountLinks = [
    {name: 'Profile', route: '/'},
    {name: 'Settings', route: '/'}
  ];

  userName$: Observable<string>;

  constructor(protected oidcFacade: OidcFacade, protected store: Store) {}

  ngOnInit() {
    this.userName$ = this.oidcFacade.identity$.pipe(
      map(user => (user && !user.expired ? user.profile.name : '')),
      share()
    );
  }

  register() {
    this.store.dispatch(actionOidcRegister());
  }

  signin() {
    this.oidcFacade.signinRedirect();
  }

  signout() {
    this.oidcFacade.signoutRedirect();
  }
}

import {OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {share, map} from 'rxjs/operators';
import {OidcFacade} from 'ng-oidc-client';
import {environment} from '@env/environment';

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

  constructor(protected oidcFacade: OidcFacade) {}

  ngOnInit() {
    this.userName$ = this.oidcFacade.identity$.pipe(
      map(user => (user && !user.expired ? user.profile.name : '')),
      share()
    );
  }

  register() {
    const returnUrl = `${environment.thisUri}/register-callback`;
    window.location.href = `${environment.authServerUri}/Identity/Account/Register?ReturnUrl=${returnUrl}`;
  }

  signin() {
    this.oidcFacade.signinRedirect();
  }

  signout() {
    this.oidcFacade.signoutRedirect();
  }
}

import {actionOidcRegister} from '@core/auth/auth.actions';
import {Store} from '@ngrx/store';
import {OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {share, map} from 'rxjs/operators';
import {OidcFacade} from 'ng-oidc-client';
import {MenuItem} from 'primeng/api/menuitem';

export class NavigationBase implements OnInit {
  accountMenuItems: MenuItem[];

  userName$: Observable<string>;

  constructor(protected oidcFacade: OidcFacade, protected store: Store) {}

  ngOnInit() {
    this.userName$ = this.oidcFacade.identity$.pipe(
      map(user => (user && !user.expired ? user.profile.name : '')),
      share()
    );

    this.accountMenuItems = [
      {
        label: 'Profile',
        routerLink: ['/']
      },
      {
        label: 'Sign out',
        command: () => this.signout()
      }
    ];
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

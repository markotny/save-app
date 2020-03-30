import {actionOidcRegisterSuccess} from './../auth.actions';
import {Component, OnInit} from '@angular/core';
import {AuthCallback} from './auth-callback.enum';
import {OidcFacade} from 'ng-oidc-client';
import {Router, ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-auth-callback',
  template: ``,
  styles: []
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private oidcFacade: OidcFacade,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(async data => {
      switch (data.action) {
        case AuthCallback.Login:
          this.oidcFacade
            .getUserManager()
            .signinRedirectCallback()
            .then(() => this.router.navigate(['/']));
          break;
        case AuthCallback.Register:
          this.store.dispatch(actionOidcRegisterSuccess());
          break;
        case AuthCallback.SilentRefresh:
          this.oidcFacade.getUserManager().signinSilentCallback();
          break;
      }
    });
  }
}

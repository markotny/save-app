import {loginSuccess, registerSuccess} from '../auth.actions';
import {Component, OnInit} from '@angular/core';
import {AuthCallback} from './auth-callback.enum';
import {OidcFacade} from 'ng-oidc-client';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {
  constructor(private oidcFacade: OidcFacade, private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(async data => {
      switch (data.action) {
        case AuthCallback.Login:
          this.store.dispatch(loginSuccess());
          break;
        case AuthCallback.Register:
          this.store.dispatch(registerSuccess());
          break;
        case AuthCallback.SilentRefresh:
          this.oidcFacade.getUserManager().signinSilentCallback();
          break;
      }
    });
  }
}

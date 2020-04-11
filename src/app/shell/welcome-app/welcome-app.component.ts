import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {actionOidcRegister} from '@core/auth/auth.actions';
import {OidcFacade} from 'ng-oidc-client';

@Component({
  selector: 'app-welcome-app',
  templateUrl: './welcome-app.component.html',
  styleUrls: ['./welcome-app.component.scss']
})
export class WelcomeAppComponent implements OnInit {
  constructor(private store: Store, private oidcFacade: OidcFacade) {}

  ngOnInit(): void {}

  register() {
    this.store.dispatch(actionOidcRegister());
  }

  signin() {
    this.oidcFacade.signinRedirect();
  }
}

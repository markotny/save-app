import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Store} from '@ngrx/store';
import {actionOidcRegister} from '@core/auth/auth.actions';
import {OidcFacade} from 'ng-oidc-client';

@Component({
  selector: 'app-welcome-app',
  templateUrl: './welcome-app.component.html',
  styleUrls: ['./welcome-app.component.scss']
})
export class WelcomeAppComponent implements OnInit, OnDestroy {
  constructor(@Inject(DOCUMENT) private document, private store: Store, private oidcFacade: OidcFacade) {}

  ngOnInit(): void {
    this.document.body.classList.add('background-light');
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('background-light');
  }

  register() {
    this.store.dispatch(actionOidcRegister());
  }

  signin() {
    this.oidcFacade.signinRedirect();
  }
}

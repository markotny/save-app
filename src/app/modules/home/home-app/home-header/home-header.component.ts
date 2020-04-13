import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {OidcFacade} from 'ng-oidc-client';
import {actionOidcRegister} from '@core/auth/auth.actions';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent {
  constructor(private store: Store, private oidcFacade: OidcFacade) {}

  register() {
    this.store.dispatch(actionOidcRegister());
  }

  signin() {
    this.oidcFacade.signinRedirect();
  }
}

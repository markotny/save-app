import {Component} from '@angular/core';
import {OidcFacade} from 'ng-oidc-client';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent {
  constructor(private oidcFacade: OidcFacade) {}

  isOpen = false;

  signin() {
    this.oidcFacade.signinRedirect();
  }
}

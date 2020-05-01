import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {accountMenu} from '@shell/account-menu.model';
import {OidcFacade} from 'ng-oidc-client';
import {MenuItem} from 'primeng/api/menuitem';
import {AuthService} from '@core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter();

  accountMenuOpen = false;
  accountMenuItems: MenuItem[];

  constructor(private oidcFacade: OidcFacade, public auth: AuthService) {}

  ngOnInit() {
    this.accountMenuItems = accountMenu(() => this.oidcFacade.signoutRedirect());
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit(true);
  }
}

import {Component, OnInit} from '@angular/core';
import {OidcFacade} from 'ng-oidc-client';
import {MenuItem} from 'primeng/api/menuitem';
import {accountMenu} from '@shell/account-menu.model';
import {AuthService} from '@core/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  accountMenuItems: MenuItem[];
  sideMenuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi dashboard-icon',
      routerLink: ['/app/dashboard']
    },
    {
      label: 'Budgets',
      icon: 'pi budget-icon',
      routerLink: ['/app/budgets'],
      items: [
        {label: 'Add budget', icon: 'pi plus-icon'},
        {label: 'Edit budgets', icon: 'pi edit-icon'}
      ]
    },
    {
      label: 'Categories',
      icon: 'pi categories-icon',
      items: [
        {label: 'Add category', icon: 'pi plus-icon'},
        {label: 'Edit category', icon: 'pi edit-icon'}
      ]
    },
    {
      label: 'Income',
      icon: 'pi pi-cloud-download'
    }
  ];

  constructor(private oidcFacade: OidcFacade, public auth: AuthService) {}

  ngOnInit(): void {
    this.accountMenuItems = accountMenu(() => this.oidcFacade.signoutRedirect());
  }
}

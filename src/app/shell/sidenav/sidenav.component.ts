import {Component, OnInit} from '@angular/core';
import {OidcFacade} from 'ng-oidc-client';
import {MenuItem} from 'primeng/api/menuitem';
import {Observable, of} from 'rxjs';
import {accountMenu} from '@shell/account-menu.model';
import {shareReplay, map, share} from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  userName$: Observable<string>;
  accountMenuItems: MenuItem[];
  sideMenuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      routerLink: ['/app/dashboard']
    },
    {
      label: 'Budgets',
      icon: 'pi pi-money-bill',
      items: [
        {label: 'New', icon: 'pi pi-plus'},
        {label: 'All', icon: 'pi pi-circle-off'}
      ]
    },
    {
      label: 'Categories',
      icon: 'pi pi-list'
    },
    {
      label: 'Income',
      icon: 'pi pi-cloud-download'
    }
  ];

  constructor(private oidcFacade: OidcFacade) {}

  ngOnInit(): void {
    this.userName$ = this.oidcFacade.identity$.pipe(
      map(user => (user && !user.expired ? user.profile.name : '')),
      share()
    );
    this.accountMenuItems = accountMenu(() => this.oidcFacade.signoutRedirect());
  }
}

import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {NavigationBase} from '@shell/navigation-base/navigation-base';
import {OidcFacade} from 'ng-oidc-client';
import {Store} from '@ngrx/store';
import {MenuItem} from 'primeng/api/menuitem';
import {Subscription} from 'rxjs';
import {MediaObserver} from '@angular/flex-layout';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent extends NavigationBase implements OnInit, OnDestroy {
  private subscription: Subscription;

  userName: string;

  sideMenuItems: MenuItem[];

  @Output() sidenavClose = new EventEmitter();

  constructor(oidcFacade: OidcFacade, store: Store, mediaObserver: MediaObserver) {
    super(oidcFacade, store, mediaObserver);
  }

  ngOnInit() {
    super.ngOnInit();

    this.subscription = this.userName$.subscribe(userName => {
      this.userName = userName;
    });

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

    this.sideMenuItems = [
      {label: 'Dashboard', icon: 'pi pi-home'},
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
        icon: 'pi-list'
      },
      {
        label: 'Income',
        icon: 'pi-cloud-download'
      },
      {
        label: this.userName,
        // visible: this.isMobile,
        items: this.accountMenuItems
      }
    ];
  }

  signout() {
    this.oidcFacade.signoutRedirect();
  }

  onSidenavClose() {
    this.sidenavClose.emit();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

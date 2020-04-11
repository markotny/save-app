import {Store} from '@ngrx/store';
import {OnInit, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {share, map, filter} from 'rxjs/operators';
import {OidcFacade} from 'ng-oidc-client';
import {MenuItem} from 'primeng/api/menuitem';
import {MediaObserver} from '@angular/flex-layout';

export class NavigationBase implements OnInit, OnDestroy {
  private watcher: Subscription;

  isMobile = false;

  accountMenuItems: MenuItem[];

  userName$: Observable<string>;

  constructor(protected oidcFacade: OidcFacade, protected store: Store, protected mediaObserver: MediaObserver) {}

  ngOnInit() {
    this.watcher = this.mediaObserver
      .asObservable()
      .pipe(
        filter(changes => changes.length > 0),
        map(changes => changes[0])
      )
      .subscribe(change => {
        this.isMobile = change.mqAlias === 'xs';
      });

    this.userName$ = this.oidcFacade.identity$.pipe(
      map(user => (user && !user.expired ? user.profile.name : '')),
      share()
    );

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
  }

  signout() {
    this.oidcFacade.signoutRedirect();
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }
}

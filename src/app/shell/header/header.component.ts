import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {OidcFacade} from 'ng-oidc-client';
import {accountMenu} from '@shell/account-menu.model';
import {map, share} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {MenuItem} from 'primeng/api/menuitem';
import {MediaObserver, MediaChange} from '@angular/flex-layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter();

  accountMenuItems: MenuItem[];
  userName$: Observable<string>;
  watcher$: Subscription;

  constructor(private oidcFacade: OidcFacade, private mediaObserver: MediaObserver) {}

  ngOnInit() {
    this.userName$ = this.oidcFacade.identity$.pipe(
      map(user => (user && !user.expired ? user.profile.name : '')),
      share()
    );
    this.accountMenuItems = accountMenu(() => this.oidcFacade.signoutRedirect());
    this.initWatcher();
  }

  private initWatcher(): void {
    this.watcher$ = this.mediaObserver.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias !== 'xs') {
        this.sidenavToggle.emit(false);
      } else {
        this.sidenavToggle.emit(true);
      }
    });
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit(true);
  }

  ngOnDestroy(): void {
    this.watcher$.unsubscribe();
  }
}

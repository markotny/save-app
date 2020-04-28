import {Component, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import {accountMenu} from '@shell/account-menu.model';
import {OidcFacade} from 'ng-oidc-client';
import {MenuItem} from 'primeng/api/menuitem';
import {Observable, Subscription} from 'rxjs';
import {map, share, filter, pairwise} from 'rxjs/operators';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {MediaObserver, MediaChange} from '@angular/flex-layout';

@Component({
  selector: 'app-header',
  animations: [
    trigger('openClose', [
      state(
        'true',
        style({
          transform: 'rotate(90deg)'
        })
      ),
      state(
        'false',
        style({
          transform: 'rotate(0deg)'
        })
      ),
      transition('true <=> false', [animate('0.1s ease-in-out')])
    ]),
    trigger('headerFade', [
      state(
        'true',
        style({
          opacity: 1
        })
      ),
      state(
        'false',
        style({
          opacity: 0
        })
      ),
      transition('false => true', [animate('0.1s 0.4s ease-in')]),
      transition('true => false', [animate('0.1s ease-out')])
    ])
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter();

  accountMenuOpen = false;
  accountMenuItems: MenuItem[];
  userName$: Observable<string>;
  watcher$: Subscription;

  constructor(private oidcFacade: OidcFacade, public mediaObserver: MediaObserver) {}

  ngOnInit() {
    this.userName$ = this.oidcFacade.identity$.pipe(
      map(user => (user && !user.expired ? user.profile.name : '')),
      share()
    );
    this.accountMenuItems = accountMenu(() => this.oidcFacade.signoutRedirect());
    this.initWatcher();
  }

  private initWatcher(): void {
    this.watcher$ = this.mediaObserver
      .asObservable()
      .pipe(
        map((changes: MediaChange[]) => changes[0]),
        pairwise(),
        filter(([prev]) => prev.mqAlias === 'xs')
      )
      .subscribe(() => this.sidenavToggle.emit(false));
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit(true);
  }

  ngOnDestroy(): void {
    this.watcher$.unsubscribe();
  }
}

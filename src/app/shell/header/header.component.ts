import {Component, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import {accountMenu} from '@shell/account-menu.model';
import {OidcFacade} from 'ng-oidc-client';
import {MenuItem} from 'primeng/api/menuitem';
import {Observable, Subscription} from 'rxjs';
import {map, share, filter, pairwise} from 'rxjs/operators';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {fadeAnimation} from '@shell/shell.animations';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  animations: [
    fadeAnimation,
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
    ])
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter();

  accountMenuOpen = false;
  accountMenuItems: MenuItem[];
  userName$: Observable<string>;

  constructor(private oidcFacade: OidcFacade, public breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.userName$ = this.oidcFacade.identity$.pipe(
      map(user => (user && !user.expired ? user.profile.name : '')),
      share()
    );
    this.accountMenuItems = accountMenu(() => this.oidcFacade.signoutRedirect());
  }

  isSmall(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.XSmall);
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit(true);
  }
}

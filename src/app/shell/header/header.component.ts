import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {accountMenu} from '@shell/account-menu.model';
import {OidcFacade} from 'ng-oidc-client';
import {MenuItem} from 'primeng/api/menuitem';
import {Observable} from 'rxjs';
import {map, share} from 'rxjs/operators';
import {fadeAnimation} from '@shell/shell.animations';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  animations: [fadeAnimation],
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

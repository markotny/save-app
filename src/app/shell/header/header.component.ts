import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {OidcFacade} from 'ng-oidc-client';
import {accountMenu} from '@shell/account-menu.model';
import {shareReplay, map, share} from 'rxjs/operators';
import {of, Observable} from 'rxjs';
import {MenuItem} from 'primeng/api/menuitem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter();

  accountMenuItems: MenuItem[];
  userName$: Observable<string>;

  constructor(private oidcFacade: OidcFacade) {}

  ngOnInit() {
    this.userName$ = this.oidcFacade.identity$.pipe(
      map(user => (user && !user.expired ? user.profile.name : '')),
      share()
    );
    this.accountMenuItems = accountMenu(() => this.oidcFacade.signoutRedirect());
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}

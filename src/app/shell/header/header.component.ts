import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {accountMenu} from '@shell/account-menu.model';
import {OidcFacade} from 'ng-oidc-client';
import {MenuItem} from 'primeng/api/menuitem';
import {Observable} from 'rxjs';
import {map, share, withLatestFrom} from 'rxjs/operators';
import {AppState} from '@core/core.state';
import {Store, select} from '@ngrx/store';
import {BudgetSelectors, BudgetActions} from '@state/budgets';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter();

  accountMenuItems: MenuItem[];
  userName$: Observable<string>;

  activeBudget$ = this.store.select(BudgetSelectors.active);
  activeBudgetMenuItems$: Observable<MenuItem[]> = this.store.pipe(
    select(BudgetSelectors.all),
    withLatestFrom(this.store.select(BudgetSelectors.activeId)),
    map(([budgets, activeId]) =>
      budgets.filter(b => b.id !== activeId).map(b => ({label: b.name, command: () => this.store.dispatch(BudgetActions.setActive(b))}))
    )
  );

  constructor(private oidcFacade: OidcFacade, private store: Store<AppState>) {}

  ngOnInit() {
    this.userName$ = this.oidcFacade.identity$.pipe(
      map(user => (user && !user.expired ? user.profile.name : '')),
      share()
    );
    this.accountMenuItems = accountMenu(() => this.oidcFacade.signoutRedirect());
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit(true);
  }
}

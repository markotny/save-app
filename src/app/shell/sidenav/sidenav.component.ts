import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {OidcFacade} from 'ng-oidc-client';
import {MenuItem} from 'primeng/api/menuitem';
import {Observable} from 'rxjs';
import {accountMenu} from '@shell/account-menu.model';
import {map, share} from 'rxjs/operators';
import {AppState} from '@core/core.state';
import {Store} from '@ngrx/store';
import {BudgetActions} from '@state/budgets';
import {CategoryActions} from '@state/categories';
import {ExpenseActions} from '@state/expenses';
import {IncomeActions} from '@state/incomes';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter();
  userName$: Observable<string>;
  accountMenuItems: MenuItem[];
  sideMenuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi dashboard-icon',
      routerLink: ['/app/dashboard'],
      command: () => this.onClickSidenav()
    },
    {
      label: 'Budgets',
      icon: 'pi budget-icon',
      items: [
        {
          label: 'Overview',
          icon: 'pi overview-icon',
          routerLink: ['/app/budget'],
          command: () => this.onClickSidenav()
        },
        {
          label: 'Add budget',
          icon: 'pi plus-icon',
          command: () => {
            this.store.dispatch(BudgetActions.addDialog());
            this.onClickSidenav();
          }
        },
        {
          label: 'Edit current',
          icon: 'pi edit-icon',
          command: () => {
            this.store.dispatch(BudgetActions.editActiveDialog());
            this.onClickSidenav();
          }
        },
        {
          label: 'Remove current',
          icon: 'pi pi-trash',
          command: () => {
            this.store.dispatch(BudgetActions.removeActiveDialog());
            this.onClickSidenav();
          }
        }
      ]
    },
    {
      label: 'Categories',
      icon: 'pi categories-icon',
      items: [
        {
          label: 'Overview',
          icon: 'pi overview-icon',
          routerLink: ['/app/categories'],
          command: () => this.onClickSidenav()
        },
        {
          label: 'Add category',
          icon: 'pi plus-icon',
          command: () => {
            this.store.dispatch(CategoryActions.addDialog());
            this.onClickSidenav();
          }
        }
      ]
    },
    {
      label: 'Incomes',
      icon: 'pi income-icon',
      items: [
        {
          label: 'Overview',
          icon: 'pi overview-icon',
          routerLink: ['/app/incomes'],
          command: () => this.onClickSidenav()
        },
        {
          label: 'Add income',
          icon: 'pi plus-icon',
          command: () => {
            this.store.dispatch(IncomeActions.addDialog());
            this.onClickSidenav();
          }
        }
      ]
    },
    {
      label: 'Expenses',
      icon: 'pi expenses-icon',
      items: [
        {
          label: 'Overview',
          icon: 'pi overview-icon',
          routerLink: ['/app/expenses'],
          command: () => this.onClickSidenav()
        },
        {
          label: 'Add expense',
          icon: 'pi plus-icon',
          command: () => {
            this.store.dispatch(ExpenseActions.addDialog());
            this.onClickSidenav();
          }
        }
      ]
    }
  ];

  constructor(private oidcFacade: OidcFacade, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userName$ = this.oidcFacade.identity$.pipe(
      map(user => (user && !user.expired ? user.profile.name : '')),
      share()
    );
    this.accountMenuItems = accountMenu(() => this.oidcFacade.signoutRedirect());
  }

  private onClickSidenav(): void {
    this.sidenavToggle.emit();
  }
}

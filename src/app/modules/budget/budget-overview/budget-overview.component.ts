import {Component, OnInit} from '@angular/core';
import {BudgetSelectors} from '@state/budgets';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {BudgetActions} from '@state/budgets/budgets.actions';
import {ExpenseSelectors} from '@state/expenses';
import {BudgetDto} from '@wydatex/models';
import {CategorySelectors} from '@state/categories';
import {activeBudgetSummary} from '@state/selectors';

@Component({
  selector: 'app-budget-overview',
  templateUrl: './budget-overview.component.html',
  styleUrls: ['./budget-overview.component.scss']
})
export class BudgetOverviewComponent implements OnInit {
  activeBudget$ = this.store.select(BudgetSelectors.active);
  summary$ = this.store.select(activeBudgetSummary);
  expenses$ = this.store.select(ExpenseSelectors.activeBudget);
  categories$ = this.store.select(CategorySelectors.activeBudget);

  currencySymbol = 'PLN';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  edit(id: number, b: BudgetDto) {
    this.store.dispatch(BudgetActions.edit({id, item: {...b, currencySymbol: this.currencySymbol}}));
  }
}

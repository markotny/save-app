import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Budget, BudgetSelectors} from '@state/budgets';
import {select, Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {BudgetActions} from '@state/budgets/budgets.actions';

@Component({
  selector: 'app-budget-overview',
  templateUrl: './budget-overview.component.html',
  styleUrls: ['./budget-overview.component.scss']
})
export class BudgetOverviewComponent implements OnInit {
  selectedBudget$: Observable<Budget> = this.store.pipe(select(BudgetSelectors.active));

  currencySymbol = 'PLN';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  edit(b: Budget) {
    this.store.dispatch(
      BudgetActions.edit({id: b.id, item: {...b, budgetCategories: b.budgetCategories || [], currencySymbol: this.currencySymbol}})
    );
  }
}

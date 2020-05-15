import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {Budget, BudgetSelectors, BudgetActions} from '@state/budgets';
import {AppState} from '@core/core.module';

@Component({
  selector: 'app-budget-details',
  templateUrl: './budget-details.component.html',
  styleUrls: ['./budget-details.component.scss']
})
export class BudgetDetailsComponent implements OnInit {
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

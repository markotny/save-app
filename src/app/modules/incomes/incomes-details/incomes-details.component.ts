import {Component, Input, OnInit} from '@angular/core';
import {resultMemoize, select, Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {Income, IncomeActions} from '@state/incomes';
import {BudgetSelectors} from '@state/budgets';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-incomes-details',
  templateUrl: './incomes-details.component.html',
  styleUrls: ['./incomes-details.component.scss']
})
export class IncomesDetailsComponent implements OnInit {

  @Input() income: Income;

  budget$ = this.store.pipe(
    select(BudgetSelectors.all),
    map(result => result.filter(b => b.id === this.income.budgetId))
  );

  dupa = {}
  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {    this.budget$.subscribe(o =>this.dupa = o)
  console.warn(this.dupa)
  }

  editIncome(item: Income) {
    this.store.dispatch(IncomeActions.editDialog({item}));
  }

  removeIncome(item: Income) {
    this.store.dispatch(IncomeActions.removeDialog(item));
  }
}

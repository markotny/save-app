import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from '@core/core.state';
import {Store} from '@ngrx/store';

import {Income, IncomeActions, IncomeSelectors} from '@state/incomes';

@Component({
  selector: 'app-activebudget-incomes',
  templateUrl: './activebudget-incomes.component.html',
  styleUrls: ['./activebudget-incomes.component.scss']
})
export class ActivebudgetIncomesComponent implements OnInit, OnDestroy {
  incomeList$ = this.store.select(IncomeSelectors.all);
  displayDetails = false;
  selectedIncome: Income = undefined;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  editExpense(item: Income) {
    this.store.dispatch(IncomeActions.editDialog({item}));
  }

  removeExpense(item: Income) {
    this.store.dispatch(IncomeActions.removeDialog(item));
  }

  showDetails(income: Income) {
    this.displayDetails = true;
    this.selectedIncome = income;
  }
}

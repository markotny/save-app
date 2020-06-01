import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from '@core/core.state';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

import {Income, IncomeActions, IncomeSelectors} from '@state/incomes';

@Component({
  selector: 'app-activebudget-incomes',
  templateUrl: './activebudget-incomes.component.html',
  styleUrls: ['./activebudget-incomes.component.scss']
})
export class ActivebudgetIncomesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  incomeList$ = this.store.select(IncomeSelectors.all);
  incomeList = {};
  displayDetails = false;
  selectedIncome: Income = {amount: 0, budgetId: 0, date: undefined, label: '', name: '', id: -1};

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.incomeList$.subscribe(o => this.incomeList = o));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
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

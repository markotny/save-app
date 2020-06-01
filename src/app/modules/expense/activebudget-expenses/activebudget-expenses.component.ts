import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from '@core/core.state';
import {Store} from '@ngrx/store';
import {Expense, ExpenseActions, ExpenseSelectors} from '@state/expenses';
import {Subscription} from 'rxjs';
import {Category, CategoryActions} from '@state/categories';

@Component({
  selector: 'app-activebudget-expenses',
  templateUrl: './activebudget-expenses.component.html',
  styleUrls: ['./activebudget-expenses.component.scss']
})
export class ActivebudgetExpensesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  expenseList$ = this.store.select(ExpenseSelectors.activeBudget);
  expenseList = {};

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.expenseList$.subscribe(o => this.expenseList = o));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  editExpense(item: Expense) {
    this.store.dispatch(ExpenseActions.editDialog({item}));
  }

  removeExpense(item: Expense) {
    this.store.dispatch(ExpenseActions.removeDialog(item));
  }
}

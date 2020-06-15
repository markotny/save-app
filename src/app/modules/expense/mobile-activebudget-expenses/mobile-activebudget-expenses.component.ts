import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {Expense, ExpenseActions, ExpenseExtended, ExpenseSelectors} from '@state/expenses';
import {ActivebudgetExpensesComponent} from '@modules/expense/activebudget-expenses/activebudget-expenses.component';
import {activeBudgetExpenses} from '@state/selectors';
import {ExpenseComponent} from '@modules/expense/expense/expense.component';

@Component({
  selector: 'app-mobile-activebudget-expenses',
  templateUrl: './mobile-activebudget-expenses.component.html',
  styleUrls: ['./mobile-activebudget-expenses.component.scss']
})
export class MobileActivebudgetExpensesComponent implements OnInit {

  expenseList$ = this.store.select(activeBudgetExpenses);
  displayDetails = false;
  selectedExpense: ExpenseExtended = undefined;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  editExpense(expense: ExpenseExtended) {
    const item = ExpenseComponent.toExpenseType(expense);
    this.store.dispatch(ExpenseActions.editDialog({item}));
  }
  removeExpense(expense: ExpenseExtended) {
    const item = ExpenseComponent.toExpenseType(expense);
    this.store.dispatch(ExpenseActions.removeDialog(item));
  }

  showDetails(expense: ExpenseExtended) {
    this.displayDetails = true;
    this.selectedExpense = expense;
  }

}

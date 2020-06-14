import {Component} from '@angular/core';
import {AppState} from '@core/core.state';
import {Store} from '@ngrx/store';
import {ExpenseActions, ExpenseExtended} from '@state/expenses';
import {activeBudgetExpenses} from '@state/selectors';
import {ExpenseComponent} from '@modules/expense/expense/expense.component';

@Component({
  selector: 'app-activebudget-expenses',
  templateUrl: './activebudget-expenses.component.html',
  styleUrls: ['./activebudget-expenses.component.scss']
})
export class ActivebudgetExpensesComponent {
  expenseList$ = this.store.select(activeBudgetExpenses);

  displayDetails = false;
  selectedExpense: ExpenseExtended = undefined;

  constructor(private store: Store<AppState>) {
  }

  editExpense(event: Event, expense: ExpenseExtended) {
    event.stopPropagation();
    const item = ExpenseComponent.toExpenseType(expense);
    this.store.dispatch(ExpenseActions.editDialog({item}));
  }

  removeExpense(event: Event, expense: ExpenseExtended) {
    event.stopPropagation();
    const item = ExpenseComponent.toExpenseType(expense);
    this.store.dispatch(ExpenseActions.removeDialog(item));
  }

  showDetails(expense: ExpenseExtended) {
    this.displayDetails = true;
    this.selectedExpense = expense;
  }
}

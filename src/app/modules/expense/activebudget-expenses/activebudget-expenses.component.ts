import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from '@core/core.state';
import {Store} from '@ngrx/store';
import {Expense, ExpenseActions, ExpenseExtended, ExpenseSelectors} from '@state/expenses';
import {activeBudgetExpenses} from '@state/selectors';
import {ExpenseComponent} from '@modules/expense/expense/expense.component';


@Component({
  selector: 'app-activebudget-expenses',
  templateUrl: './activebudget-expenses.component.html',
  styleUrls: ['./activebudget-expenses.component.scss']
})
export class ActivebudgetExpensesComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>) {
  }


  expenseList$ = this.store.select(activeBudgetExpenses);


  displayDetails = false;
  selectedExpense: ExpenseExtended = undefined;



  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

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

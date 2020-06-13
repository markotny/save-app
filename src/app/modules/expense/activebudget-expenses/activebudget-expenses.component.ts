import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from '@core/core.state';
import {Store} from '@ngrx/store';
import {Expense, ExpenseActions} from '@state/expenses';
import {activeBudgetExpenses} from '@state/selectors';


@Component({
  selector: 'app-activebudget-expenses',
  templateUrl: './activebudget-expenses.component.html',
  styleUrls: ['./activebudget-expenses.component.scss']
})
export class ActivebudgetExpensesComponent implements OnInit, OnDestroy {


  expenseList$ = this.store.select(activeBudgetExpenses);


  displayDetails = false;
  selectedExpense: Expense = undefined;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  editExpense(item: Expense) {
    this.store.dispatch(ExpenseActions.editDialog({item}));
  }

  removeExpense(item: Expense) {
    this.store.dispatch(ExpenseActions.removeDialog(item));
  }

  showDetails(expense: Expense) {
    this.displayDetails = true;
    this.selectedExpense = expense;
  }
}

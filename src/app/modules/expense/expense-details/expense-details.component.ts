import {Component, Input, OnInit} from '@angular/core';
import {Id} from '@shared/types';
import {Expense, ExpenseActions, ExpenseExtended} from '@state/expenses';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {ActivebudgetExpensesComponent} from '@modules/expense/activebudget-expenses/activebudget-expenses.component';
import {ExpenseComponent} from '@modules/expense/expense/expense.component';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss']
})
export class ExpenseDetailsComponent implements OnInit {

  @Input() expense: ExpenseExtended;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  editExpense(expense: ExpenseExtended) {
    const item = ExpenseComponent.toExpenseType(expense);
    this.store.dispatch(ExpenseActions.editDialog({item}));
  }

  removeExpense(expense: ExpenseExtended) {
    const item = ExpenseComponent.toExpenseType(expense);
    this.store.dispatch(ExpenseActions.removeDialog(item));
  }
}

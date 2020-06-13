import {Component, Input, OnInit} from '@angular/core';
import {Expense, ExpenseActions, ExpenseExtended} from '@state/expenses';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {ExpenseComponent} from '@modules/expense/expense/expense.component';

@Component({
  selector: 'app-mobile-expense-details',
  templateUrl: './mobile-expense-details.component.html',
  styleUrls: ['./mobile-expense-details.component.scss']
})
export class MobileExpenseDetailsComponent implements OnInit {

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

import {Component, Input, OnInit} from '@angular/core';
import {Expense, ExpenseActions} from '@state/expenses';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';

@Component({
  selector: 'app-mobile-expense-details',
  templateUrl: './mobile-expense-details.component.html',
  styleUrls: ['./mobile-expense-details.component.scss']
})
export class MobileExpenseDetailsComponent implements OnInit {

  @Input() expense: Expense;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  editExpense(item: Expense) {
    this.store.dispatch(ExpenseActions.editDialog({item}));
  }

  removeExpense(item: Expense) {
    this.store.dispatch(ExpenseActions.removeDialog(item));
  }

}

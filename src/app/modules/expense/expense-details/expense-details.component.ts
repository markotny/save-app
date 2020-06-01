import {Component, Input, OnInit} from '@angular/core';
import {Id} from '@shared/types';
import {Expense, ExpenseActions} from '@state/expenses';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss']
})
export class ExpenseDetailsComponent implements OnInit {

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

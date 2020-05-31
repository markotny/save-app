import {Component, OnInit} from '@angular/core';
import {AppState} from '@core/core.state';
import {Store} from '@ngrx/store';
import {ExpenseSelectors} from '@state/expenses';

@Component({
  selector: 'app-activebudget-expenses',
  templateUrl: './activebudget-expenses.component.html',
  styleUrls: ['./activebudget-expenses.component.scss']
})
export class ActivebudgetExpensesComponent implements OnInit {
  expenseList$ = this.store.select(ExpenseSelectors.activeBudget);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
}

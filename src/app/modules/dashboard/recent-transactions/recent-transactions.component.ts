import {Component, OnInit} from '@angular/core';
import {AppState} from '@core/core.state';
import {Store} from '@ngrx/store';
import {ExpenseSelectors} from '@state/expenses';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.scss']
})
export class RecentTransactionsComponent implements OnInit {
  recentExpensesList$ = this.store.select(ExpenseSelectors.activeBudget).pipe(
    map(el => el.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())),
    map(el => el.slice(0, 10))
  );
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
}

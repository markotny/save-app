import {BudgetSelectors} from '@state/budgets';
import {CategorySelectors} from '@state/categories';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {AppState} from '@core/core.state';
import {Store} from '@ngrx/store';
import {ExpenseSelectors} from '@state/expenses';
import {map} from 'rxjs/operators';
import {activeBudgetSummary} from '@state/selectors';
import {logValue} from '@core/core.module';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  sumsHeader$ = this.store.select(activeBudgetSummary).pipe(logValue('sumy'));
  popularCategoryList$ = this.store.select(CategorySelectors.activeBudget).pipe(
    map(cl => cl.sort((a, b) => a.spent - b.spent)),
    map(cl => cl.slice(0, 10)),
    logValue('lista kategorii')
  );
  recentExpensesList$ = this.store.select(ExpenseSelectors.activeBudget).pipe(
    map(el => el.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())),
    map(el => el.slice(0, 10)),
    logValue('lista wydatków')
  );
  currencyLabel$ = this.store.select(BudgetSelectors.active).pipe(
    map(b => b?.currencySymbol),
    logValue()
  );

  constructor(private store: Store<AppState>) {}

  sums: {incomeSum?: number; expenseSum?: number; balance?: number} = {};
  currencyLabel = '';

  ngOnInit(): void {
    this.subscriptions.push(
      this.sumsHeader$.subscribe(output => (this.sums = output)),
      this.currencyLabel$.subscribe(output => (this.currencyLabel = output))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

import {Component, OnInit} from '@angular/core';
import {activeBudgetSummary} from '@state/selectors';
import {map} from 'rxjs/operators';
import {BudgetSelectors} from '@state/budgets';
import {AppState} from '@core/core.state';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-mobile-sums-header',
  templateUrl: './mobile-sums-header.component.html',
  styleUrls: ['./mobile-sums-header.component.scss']
})
export class MobileSumsHeaderComponent implements OnInit {
  sumsHeader$ = this.store.select(activeBudgetSummary);
  currencyLabel$ = this.store.select(BudgetSelectors.active).pipe(map(b => b?.currencySymbol));
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  calculateBudgetPercent(sums: {incomeSum: number; expenseSum: number; balance: number}): number {
    const result = Math.round(sums.incomeSum / sums.expenseSum);
    return isNaN(result) ? 0.0 : result;
  }
}

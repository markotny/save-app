import {Component, OnInit} from '@angular/core';
import {activeBudgetSummary} from '@state/selectors';
import {AppState} from '@core/core.state';
import {Store} from '@ngrx/store';
import {BudgetSelectors} from '@state/budgets';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-desktop-sums-header',
  templateUrl: './desktop-sums-header.component.html',
  styleUrls: ['./desktop-sums-header.component.scss']
})
export class DesktopSumsHeaderComponent implements OnInit {
  sumsHeader$ = this.store.select(activeBudgetSummary);
  currencyLabel$ = this.store.select(BudgetSelectors.active).pipe(map(b => b?.currencySymbol));
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  calculateBudgetPercent(sums: {incomeSum: number; expenseSum: number; balance: number}): number {
    const result = (sums.incomeSum - sums.expenseSum) / sums.incomeSum;
    return isNaN(result) ? 0.0 : result;
  }
}

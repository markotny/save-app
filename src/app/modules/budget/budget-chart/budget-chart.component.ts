import {Component, OnInit} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {ExpenseSelectors} from '@state/expenses';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-budget-chart',
  templateUrl: './budget-chart.component.html',
  styleUrls: ['./budget-chart.component.scss']
})
export class BudgetChartComponent implements OnInit {
  data$: Observable<{}>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.data$ = this.store.pipe(
      select(ExpenseSelectors.activeBudget),
      map(expenses => {
        const sorted = expenses.sort((a, b) => a.date.getTime() - b.date.getTime());

        const grouped = sorted.reduce(
          (days, e) => ({...days, [e.date.toLocaleDateString()]: (days[e.date.toLocaleDateString()] || 0) + e.amount}),
          {}
        );

        return {
          labels: Object.keys(grouped),
          datasets: [{label: 'Wydatki', data: Object.values(grouped)}]
        };
      })
    );
  }
}

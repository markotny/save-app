import {Component, OnInit} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {ExpenseSelectors} from '@state/expenses';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-budget-chart',
  templateUrl: './budget-chart.component.html',
  styleUrls: ['./budget-chart.component.scss']
})
export class BudgetChartComponent implements OnInit {
  data$ = this.store.pipe(
    select(ExpenseSelectors.activeBudget),
    map(expenses => {
      const sorted = expenses.sort((a, b) => a.date.getTime() - b.date.getTime());

      return {
        labels: sorted.map(e => e.date.toLocaleDateString()),
        datasets: [{label: 'Wydatki', data: sorted.map(e => e.amount)}]
      };
    })
  );

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
}

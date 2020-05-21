import {Component, OnInit, Input} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AppState} from '@core/core.state';
import {Store, select} from '@ngrx/store';
import {activeBudgetSummary} from '@state/selectors';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-circle-chart',
  templateUrl: './circle-chart.component.html',
  styleUrls: ['./circle-chart.component.scss']
})
export class CircleChartComponent implements OnInit {
  @Input() width: string;
  @Input() height: string;

  sums$ = this.store.select(activeBudgetSummary);

  data$ = this.store.pipe(
    select(activeBudgetSummary),
    map(summary => {
      return summary.incomeSum !== 0
        ? {
            datasets: [
              {
                data: [summary.expenseSum, summary.incomeSum],
                backgroundColor: ['#CF4343', '#5C9D36']
              }
            ]
          }
        : {
            datasets: [
              {
                data: [summary.expenseSum, 1],
                backgroundColor: ['#CF4343', '#5C9D36']
              }
            ]
          };
    })
  );

  calcWidth: string;
  calcHeight: string;

  subtractWidth = 4.4;
  subtractHeight = 4.5;

  chartOptions: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chartOptionsMobile: any;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    const temp = this.width.split('vw');
    const temp1 = this.height.split('vw');
    this.calcWidth = String(Number(temp[0]) - this.subtractWidth) + 'vw';
    this.calcHeight = String(Number(temp1[0]) - this.subtractHeight) + 'vw';
    this.chartOptions = {
      legend: {display: false},
      events: [],
      animation: {
        duration: 0
      },
      cutoutPercentage: 70,
      elements: {
        arc: {
          borderWidth: 1,
          borderColor: '#707070'
        }
      }
    };
    this.chartOptionsMobile = Object.assign({}, this.chartOptions);
    this.chartOptionsMobile.cutoutPercentage = 80;
  }

  calculateBudgetSpent(sums: {incomeSum: number; expenseSum: number; balance: number}): number {
    const result = Math.round(sums.incomeSum / sums.expenseSum);
    return isNaN(result) ? 1.0 : result;
  }
}

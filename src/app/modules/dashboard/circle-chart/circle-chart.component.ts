import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-circle-chart',
  templateUrl: './circle-chart.component.html',
  styleUrls: ['./circle-chart.component.scss']
})
export class CircleChartComponent implements OnInit {
  @Input() width: string;
  @Input() height: string;

  calcWidth: string;
  calcHeight: string;

  subtractWidth = 4.4;
  subtractHeight = 4.5;

  chartOptions: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chartOptionsMobile: any;

  constructor() {}

  data = {
    datasets: [
      {
        data: [300, 50],
        backgroundColor: ['#CF4343', '#5C9D36']
      }
    ]
  };

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
}

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

  subtractWidth = 7.5;
  subtractHeight = 6.5;

  chartOptions: unknown;

  constructor() {}

  data = {
    datasets: [
      {
        data: [300, 50],
        backgroundColor: ['#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#FFCE56']
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
      events: []
    };
  }
}

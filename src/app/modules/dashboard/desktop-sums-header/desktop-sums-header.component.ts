import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-desktop-sums-header',
  templateUrl: './desktop-sums-header.component.html',
  styleUrls: ['./desktop-sums-header.component.scss']
})
export class DesktopSumsHeaderComponent implements OnInit {
  @Input() sums: {incomeSum: number; expenseSum: number; balance: number} = {incomeSum: 0, expenseSum: 0, balance: 0};
  @Input() currencyLabel: string;
  constructor() {}

  ngOnInit(): void {}
}

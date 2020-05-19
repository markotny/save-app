import {Component, OnInit} from '@angular/core';
import {CategoryVM} from '@Wydatex/models';

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.scss']
})
export class RecentTransactionsComponent implements OnInit {
  models: {category: CategoryVM; categoryExpenses: number; budgetCurrency: string}[] = [];

  constructor() {}

  ngOnInit(): void {
    const mockCategory: CategoryVM = {name: 'randomname', id: 10};
    for (let i = 0; i < 50; i = i + 1) {
      this.models.push({category: mockCategory, categoryExpenses: i, budgetCurrency: 'zl'});
    }
    console.log(this.models);
  }
}

import {Component, OnInit} from '@angular/core';
import {CategoryVM} from '@Wydatex/models';

@Component({
  selector: 'app-popular-categories',
  templateUrl: './popular-categories.component.html',
  styleUrls: ['./popular-categories.component.scss']
})
export class PopularCategoriesComponent implements OnInit {
  models: {category: CategoryVM; categoryExpenses: number; budgetCurrency: string}[] = [];

  constructor() {}

  ngOnInit(): void {
    const mockCategory: CategoryVM = {name: 'randomname', id: 10};
    for (let i = 0; i < 50; i = i + 1) {
      this.models.push({category: mockCategory, categoryExpenses: i, budgetCurrency: 'zl'});
    }
  }
}

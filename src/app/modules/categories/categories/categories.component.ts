import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {CategorySelectors} from '@state/categories';
import {AppState} from '@core/core.state';
import {Subscription} from 'rxjs';
import {BudgetSelectors} from '@state/budgets';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  cols: any[];
  subscriptions: Subscription[] = [];
  allCategories$ = this.store.select(CategorySelectors.all);
  allCategories = {};


  constructor(private store: Store<AppState>) {
    this.cols = [
      {field: 'vin', header: 'Vin'},
      {field: 'year', header: 'Year'},
      {field: 'brand', header: 'Brand'},
      {field: 'color', header: 'Color'}
    ];
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.allCategories$.subscribe(o => this.allCategories = o),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}

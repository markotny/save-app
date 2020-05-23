import {Component, OnInit} from '@angular/core';
import {CategorySelectors, Category, CategoryActions} from '@state/categories';
import {Store, select} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {BudgetSelectors} from '@state/budgets';
import {pluck, share, map} from 'rxjs/operators';

@Component({
  selector: 'app-budget-categories',
  templateUrl: './budget-categories.component.html',
  styleUrls: ['./budget-categories.component.scss']
})
export class BudgetCategoriesComponent implements OnInit {
  categories$ = this.store.select(CategorySelectors.activeBudgetSums);

  currency$ = this.store.pipe(select(BudgetSelectors.active), pluck('currencySymbol'), share());

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  editCategory(item: Category) {
    this.store.dispatch(CategoryActions.editDialog({item}));
  }
  removeCategory(item: Category) {
    this.store.dispatch(CategoryActions.removeDialog(item));
  }
}

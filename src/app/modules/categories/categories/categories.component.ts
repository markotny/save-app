import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Category, CategoryActions, CategorySelectors} from '@state/categories';
import {AppState} from '@core/core.state';
import {Subscription} from 'rxjs';
import {BudgetSelectors, Budget} from '@state/budgets';
import {CategoryVM} from '@wydatex/models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  allCategories$ = this.store.select(CategorySelectors.all);
  activeCategories$ = this.store.select(CategorySelectors.activeBudgetSums);

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  editCategory(item: Category) {
    this.store.dispatch(CategoryActions.editDialog({item}));
  }

  removeCategory(item: Category) {
    this.store.dispatch(CategoryActions.removeDialog(item));
  }


}

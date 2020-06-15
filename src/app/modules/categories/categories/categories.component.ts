import {Component} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {Category, CategoryActions, CategorySelectors} from '@state/categories';
import {AppState} from '@core/core.state';
import {BudgetSelectors} from '@state/budgets';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  allCategories$ = this.store.select(CategorySelectors.all);
  activeCategories$ = this.store.select(CategorySelectors.activeBudgetSums);

  currencySymbol$ = this.store.pipe(
    select(BudgetSelectors.active),
    map(x => x && x.currencySymbol)
  );

  constructor(private store: Store<AppState>) {}

  editCategory(item: Category) {
    this.store.dispatch(CategoryActions.editDialog({item}));
  }

  removeCategory(item: Category) {
    this.store.dispatch(CategoryActions.removeDialog(item));
  }
}

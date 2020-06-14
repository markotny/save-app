import {Component} from '@angular/core';
import {CategorySelectors, Category, CategoryActions} from '@state/categories';
import {Store, select} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {BudgetSelectors} from '@state/budgets';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-budget-categories',
  templateUrl: './budget-categories.component.html',
  styleUrls: ['./budget-categories.component.scss']
})
export class BudgetCategoriesComponent {
  categories$ = this.store.select(CategorySelectors.activeBudgetSums);

  currency$ = this.store.pipe(
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

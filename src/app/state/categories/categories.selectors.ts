import {adapter} from './categories.reducer';
import {createSelector} from '@ngrx/store';
import {Id} from '@shared/types';
import {selectCategoryState} from '@state/data.state';
import {Category} from './categories.model';
import * as BudgetSelectors from '@state/budgets/budgets.selectors';
import * as ExpenseSelectors from '@state/expenses/expenses.selectors';

const {selectAll, selectEntities} = adapter.getSelectors();

export const all = createSelector(selectCategoryState, selectAll);
export const entities = createSelector(selectCategoryState, selectEntities);

export const byIds = (ids: Id<Category>[]) => createSelector(all, categories => categories.filter(c => ids.includes(c.id)));

export const activeBudget = createSelector(
  entities,
  BudgetSelectors.active,
  (categories, budget) =>
    budget?.budgetCategories?.filter(bc => !!categories[bc.id]).map(bc => ({...bc, name: categories[bc.id].name})) ?? []
);

export const activeBudgetSums = createSelector(activeBudget, ExpenseSelectors.activeBudgetGroupedSums, (categories, expenses) =>
  categories.map(c => ({...c, spent: expenses[c.id] || 0}))
);

import {adapter} from './categories.reducer';
import {createSelector} from '@ngrx/store';
import {Id} from '@shared/types';
import {selectCategoryState} from '@state/data.state';
import {Category} from './categories.model';
import {BudgetSelectors} from '@state/budgets';
import {ExpenseSelectors} from '@state/expenses';

const {selectAll, selectEntities} = adapter.getSelectors();

export const all = createSelector(selectCategoryState, selectAll);
export const entities = createSelector(selectCategoryState, selectEntities);

export const byIds = (ids: Id<Category>[]) => createSelector(all, categories => categories.filter(c => ids.includes(c.id)));

export const activeBudget = createSelector(
  entities,
  BudgetSelectors.active,
  ExpenseSelectors.activeBudgetGroupedSums,
  (categories, budget, expenses) => budget.budgetCategories?.map(bc => ({...bc, name: categories[bc.id].name, spent: expenses[bc.id]}))
);

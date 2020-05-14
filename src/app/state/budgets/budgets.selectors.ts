import {adapter} from './budgets.reducer';
import {createSelector, MemoizedSelector} from '@ngrx/store';
import {Extend} from '@shared/types';
import {Budget} from './budgets.model';
import {selectBudgetState, DataState} from '@state/data.state';
import {CategorySelectors} from '@state/categories';
import {BudgetCategoryVM, CategoryVM} from '@wydatex/models';

const {selectAll, selectEntities} = adapter.getSelectors();

export const all = createSelector(selectBudgetState, selectAll);
export const entities = createSelector(selectBudgetState, selectEntities);
export const activeId = createSelector(selectBudgetState, state => state.activeBudgetId);

export const active: MemoizedSelector<DataState, BudgetWithCategoryNames> = createSelector(
  activeId,
  entities,
  CategorySelectors.entities,
  (id, budgets, categories) =>
    id &&
    budgets[id] && {
      ...budgets[id],
      budgetCategories: budgets[id].budgetCategories?.map(bc => ({...bc, name: categories[bc.id].name})) ?? []
    }
);

type BudgetWithCategoryNames = Extend<Budget, BudgetCategoryVM, CategoryVM>;

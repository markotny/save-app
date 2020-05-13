import {adapter} from './budgets.reducer';
import {createSelector, MemoizedSelector} from '@ngrx/store';
import {Extend} from '@shared/types';
import {Budget} from './budgets.model';
import {selectBudgetState, DataState} from '@state/data.state';
import {selectCategoryEntities} from '@state/categories';
import {BudgetCategoryVM, CategoryVM} from '@wydatex/models';

const {selectAll, selectEntities} = adapter.getSelectors();

export const selectAllBudgets = createSelector(selectBudgetState, selectAll);
export const selectBudgetEntities = createSelector(selectBudgetState, selectEntities);
export const selectActiveBudgetId = createSelector(selectBudgetState, state => state.activeBudgetId);

export const selectActiveBudget: MemoizedSelector<DataState, BudgetWithCategoryNames> = createSelector(
  selectActiveBudgetId,
  selectBudgetEntities,
  selectCategoryEntities,
  (id, budgets, categories) =>
    id &&
    budgets[id] && {
      ...budgets[id],
      budgetCategories: budgets[id].budgetCategories?.map(bc => ({...bc, name: categories[bc.id].name})) ?? []
    }
);

type BudgetWithCategoryNames = Extend<Budget, BudgetCategoryVM, CategoryVM>;

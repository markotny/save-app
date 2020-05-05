import {budgetAdapter} from './budget.reducer';
import {createSelector} from '@ngrx/store';
import {selectRouterState} from '@core/core.state';
import {selectBudgets} from './budget.state';

const {selectAll, selectEntities} = budgetAdapter.getSelectors();

export const selectAllBudgets = createSelector(selectBudgets, selectAll);
export const selectBudgetEntities = createSelector(selectBudgets, selectEntities);

export const selectSelectedBudget = createSelector(
  selectBudgetEntities,
  selectRouterState,
  (entities, router) => router && entities[router.state.params.id]
);

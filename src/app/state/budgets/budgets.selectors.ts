import {adapter} from './budgets.reducer';
import {createSelector} from '@ngrx/store';
import {Id} from '@shared/types';
import {Budget} from './budgets.model';
import {selectBudgetState} from '@state/data.state';

const {selectAll, selectEntities} = adapter.getSelectors();

export const selectAllBudgets = createSelector(selectBudgetState, selectAll);
export const selectBudgetEntities = createSelector(selectBudgetState, selectEntities);
export const selectActiveBudgetId = createSelector(selectBudgetState, state => state.activeBudgetId);

export const selectActiveBudget = createSelector(selectBudgetEntities, selectActiveBudgetId, (entities, id) => entities[id]);

export const selectBudget = (id: Id<Budget>) => createSelector(selectBudgetEntities, entities => entities[id]);

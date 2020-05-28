import {adapter} from './budgets.reducer';
import {createSelector} from '@ngrx/store';
import {selectBudgetState} from '@state/data.state';

const {selectAll, selectEntities} = adapter.getSelectors();

export const all = createSelector(selectBudgetState, selectAll);
export const entities = createSelector(selectBudgetState, selectEntities);
export const activeId = createSelector(selectBudgetState, state => state.activeBudgetId);

export const active = createSelector(activeId, entities, (id, budgets) => id && budgets[id]);

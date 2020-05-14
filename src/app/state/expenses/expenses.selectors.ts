import {adapter} from './expenses.reducer';
import {createSelector} from '@ngrx/store';
import {Id} from '@shared/types';
import {selectExpenseState} from '@state/data.state';
import {Expense} from './expenses.model';

const {selectAll, selectEntities} = adapter.getSelectors();

export const all = createSelector(selectExpenseState, selectAll);
export const entities = createSelector(selectExpenseState, selectEntities);

export const byIds = (ids: Id<Expense>[]) => createSelector(all, expenses => expenses.filter(e => ids.includes(e.id)));

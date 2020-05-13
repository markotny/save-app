import {adapter} from './expenses.reducer';
import {createSelector} from '@ngrx/store';
import {Id} from '@shared/types';
import {selectExpenseState} from '@state/app.state';
import {Expense} from './expenses.model';

const {selectAll, selectEntities} = adapter.getSelectors();

export const selectAllExpenses = createSelector(selectExpenseState, selectAll);
export const selectExpenseEntities = createSelector(selectExpenseState, selectEntities);

export const selectExpenses = (ids: Id<Expense>[]) =>
  createSelector(selectAllExpenses, expenses => expenses.filter(e => ids.includes(e.id)));

import {adapter} from './incomes.reducer';
import {createSelector} from '@ngrx/store';
import {Id} from '@shared/types';
import {selectIncomeState} from '@state/data.state';
import {Income} from './incomes.model';

const {selectAll, selectEntities} = adapter.getSelectors();

export const selectAllIncomes = createSelector(selectIncomeState, selectAll);
export const selectIncomeEntities = createSelector(selectIncomeState, selectEntities);

export const selectIncomes = (ids: Id<Income>[]) => createSelector(selectAllIncomes, incomes => incomes.filter(e => ids.includes(e.id)));

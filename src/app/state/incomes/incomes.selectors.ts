import {adapter} from './incomes.reducer';
import {createSelector} from '@ngrx/store';
import {Id} from '@shared/types';
import {selectIncomeState} from '@state/data.state';
import {Income} from './incomes.model';
import {BudgetSelectors} from '@state/budgets';

const {selectAll, selectEntities} = adapter.getSelectors();

export const all = createSelector(selectIncomeState, selectAll);
export const entities = createSelector(selectIncomeState, selectEntities);

export const byIds = (ids: Id<Income>[]) => createSelector(all, incomes => incomes.filter(e => ids.includes(e.id)));

export const activeBudgetSum = createSelector(BudgetSelectors.activeId, all, (id, incomes) =>
  incomes.filter(i => i.budgetId === id).reduce((sum, i) => sum + i.amount, 0)
);

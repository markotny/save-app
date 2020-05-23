import {adapter} from './expenses.reducer';
import {createSelector} from '@ngrx/store';
import {Id} from '@shared/types';
import {selectExpenseState} from '@state/data.state';
import {Expense} from './expenses.model';
import * as BudgetSelectors from '@state/budgets/budgets.selectors';
import {Dictionary} from '@ngrx/entity';

const {selectAll, selectEntities} = adapter.getSelectors();

export const all = createSelector(selectExpenseState, selectAll);
export const entities = createSelector(selectExpenseState, selectEntities);

export const byIds = (ids: Id<Expense>[]) => createSelector(all, expenses => expenses.filter(e => ids.includes(e.id)));

export const activeBudget = createSelector(BudgetSelectors.activeId, all, (id, expenses) =>
  expenses.filter(e => e.budgetId === id).map(e => ({...e, date: new Date(e.date)}))
);

export const activeBudgetSum = createSelector(activeBudget, expenses => expenses.reduce((sum, e) => sum + e.amount, 0));

export const activeBudgetGroupedSums = createSelector(
  activeBudget,
  expenses => expenses.reduce((dict, e) => ({...dict, [e.categoryId]: (dict[e.categoryId] || 0) + e.amount}), {}) as Dictionary<number>
);

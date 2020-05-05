import {BudgetState} from './budget.state';
import {createReducer, on, Action} from '@ngrx/store';
import {EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {Budget} from '@wydatex/models';
import {actionBudgetAdd, actionBudgetDelete} from './budget.actions';

export function sortByName(a: Budget, b: Budget): number {
  return a.name.localeCompare(b.name);
}

export const budgetAdapter: EntityAdapter<Budget> = createEntityAdapter<Budget>({
  sortComparer: sortByName
});

const b = (id: number) => ({
  id,
  startDate: new Date(2010, 1, 20),
  endDate: new Date(),
  name: 'test',
  totalBudgeted: 3000,
  disposableIncome: 2000,
  currencySymbol: 'USD',
  isActive: true,
  incomes: [],
  expenses: [],
  budgetCategories: []
});

export const initialState: BudgetState = budgetAdapter.getInitialState({
  ids: ['123', '321'],
  entities: {
    123: b(123),
    321: b(321)
  }
});

const reducer = createReducer(
  initialState,
  on(actionBudgetAdd, (state, {budget}) => budgetAdapter.addOne(budget, state)),
  on(actionBudgetDelete, (state, {id}) => budgetAdapter.removeOne(id, state))
);

export function budgetReducer(state: BudgetState | undefined, action: Action) {
  return reducer(state, action);
}

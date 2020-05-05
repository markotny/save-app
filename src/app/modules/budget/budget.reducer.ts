import {BudgetState} from './budget.state';
import {createReducer, on, Action} from '@ngrx/store';
import {EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {Budget} from '@wydatex/models';
import * as BudgetActions from './budget.actions';

export const adapter: EntityAdapter<BudgetLockable> = createEntityAdapter<BudgetLockable>({
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});
export const initialState: BudgetState = adapter.getInitialState();

const reducer = createReducer(
  initialState,
  on(BudgetActions.loadSuccess, (state, {budgets}) => adapter.setAll(budgets, state)),
  on(BudgetActions.add, (state, {tempId, budget}) => adapter.addOne({id: tempId, lock: true, ...budget}, state)),
  on(BudgetActions.addSuccess, (state, {tempId, budget}) => adapter.updateOne({id: tempId, changes: {lock: undefined, ...budget}}, state)),
  on(BudgetActions.edit, (state, {budget}) => adapter.updateOne({id: budget.id, changes: {lock: true, ...budget}}, state)),
  on(BudgetActions.editSuccess, (state, {budget}) => adapter.setOne(budget, state)),
  on(BudgetActions.remove, (state, {id}) => adapter.updateOne({id, changes: {lock: true}}, state)),
  on(BudgetActions.removeSuccess, (state, {id}) => adapter.removeOne(id, state))
  // TODO: handle failures
);

export function budgetReducer(state: BudgetState | undefined, action: Action) {
  return reducer(state, action);
}

export interface BudgetLockable extends Budget {
  lock?: true;
}
export interface BudgetAdd extends Omit<Budget, 'id'> {}
export interface BudgetEdit extends Pick<Budget, 'id'>, Partial<BudgetAdd> {}
export type BudgetId = Budget['id'];

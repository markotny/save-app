import {BudgetState} from './budget.state';
import {createReducer, on, Action} from '@ngrx/store';
import {EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {Budget} from '@wydatex/models';
import * as BudgetActions from './budget.actions';

export const adapter: EntityAdapter<BudgetModel> = createEntityAdapter<BudgetModel>({
  selectId: budget => budget.changeId ?? budget.id.toString(),
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});
export const initialState: BudgetState = adapter.getInitialState();

const reducer = createReducer(
  initialState,
  on(BudgetActions.loadSuccess, (state, {budgets}) => adapter.setAll(budgets, state)),
  on(BudgetActions.add, (state, budget) => adapter.addOne(budget, state)),
  on(BudgetActions.edit, (state, budget) => adapter.updateOne({id: budget.id, changes: budget}, state)),
  on(BudgetActions.addSuccess, BudgetActions.editSuccess, (state, {changeId, budget}) =>
    adapter.updateOne({id: changeId, changes: {...budget, changeId: undefined}}, state)
  ),
  on(BudgetActions.remove, (state, {id, changeId}) => adapter.updateOne({id, changes: {changeId}}, state)),
  on(BudgetActions.removeSuccess, (state, {changeId}) => adapter.removeOne(changeId, state))
  // TODO: handle failures
);

export function budgetReducer(state: BudgetState | undefined, action: Action) {
  return reducer(state, action);
}

export interface BudgetAdd extends Budget {
  changeId: string;
}
export interface BudgetEditInput extends Pick<Budget, 'id'>, Partial<Omit<Budget, 'id'>> {}
export interface BudgetEdit extends BudgetEditInput {
  changeId: string;
}
export interface BudgetRemove extends Pick<Budget, 'id'> {
  changeId: string;
}
export interface BudgetModel extends Budget {
  changeId?: string;
}

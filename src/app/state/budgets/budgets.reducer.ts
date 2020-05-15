/* eslint-disable @typescript-eslint/no-unused-vars */
import {createReducer, on, Action} from '@ngrx/store';
import {EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {Budget, BudgetState} from './budgets.model';
import {BudgetActions} from './budgets.actions';
import {crudReducers, ApiModule} from '@shared/state';

export const adapter: EntityAdapter<Budget> = createEntityAdapter<Budget>({
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});
export const initialState: BudgetState = adapter.getInitialState({activeBudgetId: null});

const reducer = createReducer(
  initialState,
  on(BudgetActions.setActive, (state, {id}) => ({...state, activeBudgetId: id})),

  ...crudReducers<BudgetState>(ApiModule.Budget, adapter).filter(r =>
    r.types.every(t => ![BudgetActions.getDetailsSuccess.type, BudgetActions.addSuccess.type, BudgetActions.editSuccess.type].includes(t))
  ),
  on(BudgetActions.getDetailsSuccess, BudgetActions.editSuccess, (state, {item: {incomes, expenses, ...details}}) =>
    adapter.setOne(details, state)
  ),
  on(BudgetActions.addSuccess, (state, {tempId, item: {incomes, expenses, ...details}}) =>
    adapter.updateOne({id: tempId, changes: {unsaved: undefined, ...details}}, state)
  )
  // TODO: handle failures
);

export function budgetReducer(state: BudgetState | undefined, action: Action) {
  return reducer(state, action);
}

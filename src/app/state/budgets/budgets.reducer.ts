/* eslint-disable @typescript-eslint/no-unused-vars */
import {createReducer, on, Action} from '@ngrx/store';
import {EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {Budget, BudgetState} from './budgets.model';
import {BudgetActionsAll as BudgetActions} from './budgets.actions';
import {crudReducers, ApiModule} from '@shared/state';

export const adapter: EntityAdapter<Budget> = createEntityAdapter<Budget>({
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});
export const initialState: BudgetState = adapter.getInitialState({activeBudgetId: null});

const reducer = createReducer(
  initialState,
  on(BudgetActions.setActive, (state, {id}) => ({...state, activeBudgetId: id})),

  ...crudReducers<BudgetState>(ApiModule.Budget, adapter, true),

  on(BudgetActions.loadSuccess, (state, {items}) =>
    adapter.setAll(
      items.map(({isActive, ...item}) => item),
      {...state, activeBudgetId: items.find(b => b.isActive)?.id ?? null}
    )
  ),
  on(BudgetActions.getDetailsSuccess, BudgetActions.editSuccess, (state, {item: {isActive, incomes, expenses, ...details}}) =>
    adapter.setOne(details, {...state, activeBudgetId: isActive ? details.id : state.activeBudgetId})
  ),
  on(BudgetActions.addSuccess, (state, {tempId, item: {isActive, incomes, expenses, ...details}}) =>
    adapter.updateOne(
      {id: tempId, changes: {unsaved: undefined, ...details}},
      {...state, activeBudgetId: isActive ? details.id : state.activeBudgetId}
    )
  ),
  on(BudgetActions.removeSuccess, (state, {id}) => adapter.removeOne(id, state))
  // TODO: handle failures
);

export function budgetReducer(state: BudgetState | undefined, action: Action) {
  return reducer(state, action);
}

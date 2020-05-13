/* eslint-disable @typescript-eslint/no-unused-vars */
import {createReducer, on, Action} from '@ngrx/store';
import {EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {Budget, BudgetState} from './budgets.model';
import {extractIds} from '@shared/types';
import {BudgetActions} from './budgets.actions';

export const adapter: EntityAdapter<Budget> = createEntityAdapter<Budget>({
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});
export const initialState: BudgetState = adapter.getInitialState({activeBudgetId: null});

const reducer = createReducer(
  initialState,
  on(BudgetActions.setActive, (state, {id}) => ({...state, activeBudgetId: id})),
  on(BudgetActions.loadSuccess, (state, {items}) => adapter.setAll(items, state)),
  on(BudgetActions.getDetailsSuccess, (state, {item: {incomes, expenses, ...details}}) => adapter.setOne(details, state)),
  on(BudgetActions.add, (state, {tempId, item}) => adapter.addOne({id: tempId, unsaved: 'add', ...item}, state)),
  on(BudgetActions.addSuccess, (state, {tempId, item: {incomes, expenses, ...details}}) =>
    adapter.updateOne({id: tempId, changes: {unsaved: undefined, ...details}}, state)
  ),
  on(BudgetActions.edit, (state, {id, item}) => adapter.updateOne({id, changes: {unsaved: 'edit', ...item}}, state)),
  on(BudgetActions.editSuccess, (state, {item: {incomes, expenses, ...details}}) => adapter.setOne(details, state)),
  on(BudgetActions.remove, (state, {id}) => adapter.updateOne({id, changes: {unsaved: 'remove'}}, state)),
  on(BudgetActions.removeSuccess, (state, {id}) => adapter.removeOne(id, state))
  // TODO: handle failures
);

export function budgetReducer(state: BudgetState | undefined, action: Action) {
  return reducer(state, action);
}

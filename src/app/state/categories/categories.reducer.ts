/* eslint-disable @typescript-eslint/no-unused-vars */
import {createReducer, on, Action} from '@ngrx/store';
import {EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {Category, CategoryState} from './categories.model';
import {CategoryActions} from './categories.actions';
import {BudgetActions} from '@state/budgets';

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>({
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});
export const initialState: CategoryState = adapter.getInitialState();

const reducer = createReducer(
  initialState,
  on(CategoryActions.loadSuccess, (state, {items}) => adapter.setAll(items, state)),
  on(CategoryActions.add, (state, {tempId, item}) => adapter.addOne({id: tempId, unsaved: 'add', ...item}, state)),
  on(CategoryActions.addSuccess, (state, {tempId, item}) => adapter.updateOne({id: tempId, changes: {unsaved: undefined, ...item}}, state)),
  on(CategoryActions.edit, (state, {id, item}) => adapter.updateOne({id, changes: {unsaved: 'edit', ...item}}, state)),
  on(CategoryActions.editSuccess, (state, {item}) => adapter.setOne(item, state)),
  on(CategoryActions.remove, (state, {id}) => adapter.updateOne({id, changes: {unsaved: 'remove'}}, state)),
  on(CategoryActions.removeSuccess, (state, {id}) => adapter.removeOne(id, state))
  // TODO: handle failures
);

export function categoryReducer(state: CategoryState | undefined, action: Action) {
  return reducer(state, action);
}

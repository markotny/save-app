/* eslint-disable @typescript-eslint/no-unused-vars */
import {createReducer, on, Action} from '@ngrx/store';
import {EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {Category, CategoryState} from './categories.model';
import {CategoryActions} from './categories.actions';
import {BudgetActions} from '@state/budgets';
import {CategoryVM} from '@wydatex/models';
import {crudReducers, ApiModule} from '@shared/state';

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>({
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});
export const initialState: CategoryState = adapter.getInitialState();

const reducer = createReducer(
  initialState,
  ...crudReducers<CategoryVM>(ApiModule.Category, adapter)
  // TODO: handle failures
);

export function categoryReducer(state: CategoryState | undefined, action: Action) {
  return reducer(state, action);
}

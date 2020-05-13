import {createReducer, on, Action} from '@ngrx/store';
import {EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {BudgetActions} from '@state/budgets';
import {Income, IncomeState, IncomeActions} from '.';

export const adapter: EntityAdapter<Income> = createEntityAdapter<Income>({
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});
export const initialState: IncomeState = adapter.getInitialState();

const reducer = createReducer(
  initialState,
  on(IncomeActions.loadSuccess, (state, {items}) => adapter.setAll(items, state)),
  on(IncomeActions.add, (state, {tempId, item}) => adapter.addOne({id: tempId, unsaved: 'add', ...item}, state)),
  on(IncomeActions.addSuccess, (state, {tempId, item}) => adapter.updateOne({id: tempId, changes: {unsaved: undefined, ...item}}, state)),
  on(IncomeActions.edit, (state, {id, item}) => adapter.updateOne({id, changes: {unsaved: 'edit', ...item}}, state)),
  on(IncomeActions.editSuccess, (state, {item}) => adapter.setOne(item, state)),
  on(IncomeActions.remove, (state, {id}) => adapter.updateOne({id, changes: {unsaved: 'remove'}}, state)),
  on(IncomeActions.removeSuccess, (state, {id}) => adapter.removeOne(id, state)),

  on(BudgetActions.getDetailsSuccess, (state, {item: {incomes}}) => adapter.upsertMany(incomes, state))
  // TODO: handle failures
);

export function incomeReducer(state: IncomeState | undefined, action: Action) {
  return reducer(state, action);
}

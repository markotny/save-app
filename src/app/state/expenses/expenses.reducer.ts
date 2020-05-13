import {createReducer, on, Action} from '@ngrx/store';
import {EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {ExpenseActions} from './expenses.actions';
import {BudgetActions} from '@state/budgets';
import {Expense, ExpenseState} from './expenses.model';

export const adapter: EntityAdapter<Expense> = createEntityAdapter<Expense>({
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});
export const initialState: ExpenseState = adapter.getInitialState();

const reducer = createReducer(
  initialState,
  on(ExpenseActions.loadSuccess, (state, {items}) => adapter.setAll(items, state)),
  on(ExpenseActions.add, (state, {tempId, item}) => adapter.addOne({id: tempId, unsaved: 'add', ...item}, state)),
  on(ExpenseActions.addSuccess, (state, {tempId, item}) => adapter.updateOne({id: tempId, changes: {unsaved: undefined, ...item}}, state)),
  on(ExpenseActions.edit, (state, {id, item}) => adapter.updateOne({id, changes: {unsaved: 'edit', ...item}}, state)),
  on(ExpenseActions.editSuccess, (state, {item}) => adapter.setOne(item, state)),
  on(ExpenseActions.remove, (state, {id}) => adapter.updateOne({id, changes: {unsaved: 'remove'}}, state)),
  on(ExpenseActions.removeSuccess, (state, {id}) => adapter.removeOne(id, state)),

  on(BudgetActions.getDetailsSuccess, (state, {item: {expenses}}) => adapter.upsertMany(expenses, state))
  // TODO: handle failures
);

export function expenseReducer(state: ExpenseState | undefined, action: Action) {
  return reducer(state, action);
}

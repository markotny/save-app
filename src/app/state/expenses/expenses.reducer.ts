import {createReducer, on, Action} from '@ngrx/store';
import {EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {BudgetActionsAll as BudgetActions} from '@state/budgets/budgets.actions';
import {Expense, ExpenseState} from './expenses.model';
import {crudReducers, ApiModule} from '@shared/state';

export const adapter: EntityAdapter<Expense> = createEntityAdapter<Expense>({
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});
export const initialState: ExpenseState = adapter.getInitialState();

const reducer = createReducer(
  initialState,
  ...crudReducers<ExpenseState>(ApiModule.Expense, adapter),

  on(BudgetActions.getDetailsSuccess, BudgetActions.editSuccess, (state, {item: {expenses}}) => adapter.upsertMany(expenses, state))
  // TODO: handle failures
);

export function expenseReducer(state: ExpenseState | undefined, action: Action) {
  return reducer(state, action);
}

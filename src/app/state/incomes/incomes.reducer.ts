import {createReducer, on, Action} from '@ngrx/store';
import {EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {BudgetActionsAll as BudgetActions} from '@state/budgets/budgets.actions';
import {Income, IncomeState} from './incomes.model';
import {crudReducers, ApiModule} from '@shared/state';

export const adapter: EntityAdapter<Income> = createEntityAdapter<Income>({
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});
export const initialState: IncomeState = adapter.getInitialState();

const reducer = createReducer(
  initialState,
  ...crudReducers<IncomeState>(ApiModule.Income, adapter),

  on(BudgetActions.getDetailsSuccess, BudgetActions.editSuccess, (state, {item: {incomes}}) => adapter.upsertMany(incomes, state))
  // TODO: handle failures
);

export function incomeReducer(state: IncomeState | undefined, action: Action) {
  return reducer(state, action);
}

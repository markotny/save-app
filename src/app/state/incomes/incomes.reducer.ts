import {createReducer, on, Action} from '@ngrx/store';
import {EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {BudgetActions} from '@state/budgets';
import {Income, IncomeState} from '.';
import {crudReducers} from '@shared/state';
import {IncomeVM} from '@wydatex/models';
import {ApiModule} from '@shared/state';

export const adapter: EntityAdapter<Income> = createEntityAdapter<Income>({
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});
export const initialState: IncomeState = adapter.getInitialState();

const reducer = createReducer(
  initialState,
  ...crudReducers<IncomeVM>(ApiModule.Income, adapter),
  on(BudgetActions.getDetailsSuccess, (state, {item: {incomes}}) => adapter.upsertMany(incomes, state))
  // TODO: handle failures
);

export function incomeReducer(state: IncomeState | undefined, action: Action) {
  return reducer(state, action);
}

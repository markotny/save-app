import {createFeatureSelector, ActionReducerMap} from '@ngrx/store';
import {BudgetState, budgetReducer} from './budgets';
import {CategoryState, categoryReducer} from './categories';
import {ExpenseState, expenseReducer} from './expenses';
import {IncomeState, incomeReducer} from './incomes';

export const selectBudgetState = createFeatureSelector<DataState, BudgetState>('budgets');
export const selectCategoryState = createFeatureSelector<DataState, CategoryState>('categories');
export const selectExpenseState = createFeatureSelector<DataState, ExpenseState>('expenses');
export const selectIncomeState = createFeatureSelector<DataState, IncomeState>('incomes');

export const dataReducers: ActionReducerMap<DataState> = {
  budgets: budgetReducer,
  categories: categoryReducer,
  expenses: expenseReducer,
  incomes: incomeReducer
};

export interface DataState {
  budgets: BudgetState;
  categories: CategoryState;
  expenses: ExpenseState;
  incomes: IncomeState;
}

import {createFeatureSelector, ActionReducerMap} from '@ngrx/store';
import {BudgetState} from './budgets/budgets.model';
import {CategoryState} from './categories/categories.model';
import {ExpenseState} from './expenses/expenses.model';
import {IncomeState} from './incomes/incomes.model';
import {budgetReducer} from './budgets/budgets.reducer';
import {categoryReducer} from './categories/categories.reducer';
import {expenseReducer} from './expenses/expenses.reducer';
import {incomeReducer} from './incomes/incomes.reducer';

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

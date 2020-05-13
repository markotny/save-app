import {createFeatureSelector} from '@ngrx/store';
import {BudgetState} from './budgets';
import {CategoryState} from './categories';
import {ExpenseState} from './expenses';
import {IncomeState} from './incomes';

export const selectBudgetState = createFeatureSelector<AppState, BudgetState>('budgets');
export const selectCategoryState = createFeatureSelector<AppState, CategoryState>('categories');
export const selectExpenseState = createFeatureSelector<AppState, ExpenseState>('expenses');
export const selectIncomeState = createFeatureSelector<AppState, IncomeState>('incomes');

export interface AppState {
  budgets: BudgetState;
  categories: CategoryState;
  expenses: ExpenseState;
  incomes: IncomeState;
}

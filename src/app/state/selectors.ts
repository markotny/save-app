import {createSelector} from '@ngrx/store';
import {IncomeSelectors} from './incomes';
import {ExpenseSelectors} from './expenses';
import {CategorySelectors} from '@state/categories';


export const activeBudgetSummary = createSelector(
  IncomeSelectors.activeBudgetSum,
  ExpenseSelectors.activeBudgetSum,
  (incomeSum, expenseSum) => ({
    incomeSum,
    expenseSum,
    balance: incomeSum - expenseSum
  })
);

export const activeBudgetExpenses = createSelector(
  ExpenseSelectors.activeBudget,
  CategorySelectors.activeBudget,
  (expenses, categories) =>
  expenses.map(e => ({...e, categoryName: categories.find(c => c.id === e.categoryId).name}))
);

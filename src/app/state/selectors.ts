import {createSelector} from '@ngrx/store';
import {IncomeSelectors} from './incomes';
import {ExpenseSelectors} from './expenses';

export const activeBudgetSummary = createSelector(
  IncomeSelectors.activeBudgetSum,
  ExpenseSelectors.activeBudgetSum,
  (incomeSum, expenseSum) => ({
    incomeSum,
    expenseSum,
    balance: incomeSum - expenseSum
  })
);

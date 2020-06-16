import {createSelector} from '@ngrx/store';
import {IncomeSelectors} from './incomes';
import {ExpenseSelectors} from './expenses';
import {CategorySelectors} from '@state/categories';
import {BudgetSelectors} from '@state/budgets';


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
  BudgetSelectors.active,
  (expenses, categories, budget) =>
    expenses.map(e => ({
      ...e,
      budgetName: budget.name,
      currencySymbol: budget.currencySymbol,
      categoryName: categories.find(c => c.id === e.categoryId).name
    }))
);

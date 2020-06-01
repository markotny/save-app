import {ExpenseVM, ExpenseDto} from '@wydatex/models';
import {crudActionsPublic, ApiModule, crudActionsInternal, crudActionsDialog} from '@shared/state';
import {Expense} from './expenses.model';

export const ExpenseActions = {
  ...crudActionsPublic<ExpenseDto, ExpenseVM>(ApiModule.Expense),
  ...crudActionsDialog<Expense>(ApiModule.Expense)
};

export const ExpenseActionsAll = {
  ...ExpenseActions,
  ...crudActionsInternal<ExpenseVM>(ApiModule.Expense)
};

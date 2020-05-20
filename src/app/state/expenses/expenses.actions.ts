import {ExpenseVM, ExpenseDto} from '@wydatex/models';
import {crudActionsPublic, ApiModule, crudActionsInternal} from '@shared/state';

export const ExpenseActions = crudActionsPublic<ExpenseDto, ExpenseVM>(ApiModule.Expense);

export const CategoryActionsAll = {
  ...ExpenseActions,
  ...crudActionsInternal<ExpenseVM>(ApiModule.Expense)
};

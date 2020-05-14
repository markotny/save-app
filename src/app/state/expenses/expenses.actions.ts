import {ExpenseVM, ExpenseDto} from '@wydatex/models';
import {crudActionsPublic, ApiModule, crudActionsInternal} from '@shared/state';

export const ExpenseActionsPublic = crudActionsPublic<ExpenseDto, ExpenseVM>(ApiModule.Expense);

export const CategoryActions = {
  ...ExpenseActionsPublic,
  ...crudActionsInternal<ExpenseVM>(ApiModule.Expense)
};

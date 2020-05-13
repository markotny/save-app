import {ExpenseVM, ExpenseDto} from '@wydatex/models';
import {crudActions, ApiModule} from '@shared/state';

export const ExpenseActions = crudActions<ExpenseDto, ExpenseVM>(ApiModule.Expense);

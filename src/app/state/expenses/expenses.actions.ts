import {ExpenseVM, ExpenseDto} from '@wydatex/models';
import {Expense} from './expenses.model';
import {crudActions, ApiModule} from '@shared/state';

export const ExpenseActions = crudActions<Expense, ExpenseDto, ExpenseVM>(ApiModule.Expense);

import {Unsaved} from '@shared/types';
import {EntityState} from '@ngrx/entity';
import {ExpenseVM} from '@wydatex/models';

export type Expense = ExpenseVM & Unsaved;

export interface ExpenseExtended extends Expense {
  categoryName: string;
  currencySymbol: string;
  budgetName: string;
}

export type ExpenseState = EntityState<Expense>;

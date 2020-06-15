import {Unsaved} from '@shared/types';
import {EntityState} from '@ngrx/entity';
import {IncomeVM} from '@wydatex/models';
import {Expense} from '@state/expenses';

export type Income = IncomeVM & Unsaved;

export interface IncomeExtended extends Income {
  currencySymbol: string;
  budgetName: string;
}

export type IncomeState = EntityState<Income>;

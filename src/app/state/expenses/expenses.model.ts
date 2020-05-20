import {Unsaved} from '@shared/types';
import {EntityState} from '@ngrx/entity';
import {ExpenseVM} from '@wydatex/models';

export type Expense = ExpenseVM & Unsaved;

export type ExpenseState = EntityState<Expense>;
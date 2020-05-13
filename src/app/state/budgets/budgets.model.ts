import {BudgetDetailsVM, BudgetVM} from '@wydatex/models';
import {Unsaved, Id} from '@shared/types';
import {EntityState} from '@ngrx/entity';

export type Budget = BudgetVM & Partial<Omit<BudgetDetailsVM, 'expenses' | 'incomes'>> & Unsaved;

export type BudgetState = EntityState<Budget> & {
  activeBudgetId: Id<Budget> | null;
};

import {BudgetDetailsVM, BudgetVM} from '@wydatex/models';
import {Unsaved, Id} from '@shared/types';
import {EntityState} from '@ngrx/entity';

export type Budget = BudgetVM & Partial<Omit<BudgetDetailsVM, 'expenses' | 'incomes'>> & Unsaved;

export interface BudgetState extends EntityState<Budget> {
  activeBudgetId: Id<Budget> | null;
}

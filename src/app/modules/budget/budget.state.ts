import {EntityState} from '@ngrx/entity';
import {Budget} from '@wydatex/models';
import {createFeatureSelector, ActionReducer} from '@ngrx/store';
import {budgetReducer} from './budget.reducer';

export const FEATURE_NAME = 'budgets';

export const selectBudgets = createFeatureSelector<BudgetState>(FEATURE_NAME);

export const reducers: ActionReducer<BudgetState> = budgetReducer;

export interface BudgetState extends EntityState<Budget> {}

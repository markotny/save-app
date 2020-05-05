import {createAction, props} from '@ngrx/store';
import {Budget} from '@wydatex/models';
import {v4 as uuid} from 'uuid';
import {BudgetAdd, BudgetEdit, BudgetRemove, BudgetEditInput} from './budget.reducer';

export const load = createAction('[Budget] Load');
export const add = createAction('[Budget] Add', (budget: Budget): BudgetAdd => ({...budget, changeId: uuid()}));
export const edit = createAction('[Budget] Edit', (budget: BudgetEditInput): BudgetEdit => ({...budget, changeId: uuid()}));
export const remove = createAction('[Budget] Remove', (id: number): BudgetRemove => ({id, changeId: uuid()}));

export const loadSuccess = createAction('[Budget/API] Load success', props<{budgets: Budget[]}>());
export const loadFailure = createAction('[Budget/API] Load failure', props<{error: Error}>());

export const addSuccess = createAction('[Budget/API] Add success', props<{changeId: string; budget: Budget}>());
export const addFailure = createAction('[Budget/API] Add failure', props<{changeId: string; error: Error}>());

export const editSuccess = createAction('[Budget/API] Edit success', props<{changeId: string; budget: Budget}>());
export const editFailure = createAction('[Budget/API] Edit failure', props<{changeId: string; error: Error}>());

export const removeSuccess = createAction('[Budget/API] Remove success', props<{changeId: string}>());
export const removeFailure = createAction('[Budget/API] Remove failure', props<{changeId: string; error: Error}>());

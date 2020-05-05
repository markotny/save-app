import {createAction, props} from '@ngrx/store';
import {Budget} from '@wydatex/models';
import {BudgetAdd, BudgetEdit, BudgetId} from './budget.reducer';

const randomId = () => Math.floor(Math.random() * 100) - 100;

export const load = createAction('[Budget] Load');
export const add = createAction('[Budget] Add', (budget: BudgetAdd) => ({tempId: randomId(), budget}));
export const edit = createAction('[Budget] Edit', props<{budget: BudgetEdit}>());
export const remove = createAction('[Budget] Remove', props<{id: BudgetId}>());

export const loadSuccess = createAction('[Budget/API] Load success', props<{budgets: Budget[]}>());
export const loadFailure = createAction('[Budget/API] Load failure', props<{error: Error}>());

export const addSuccess = createAction('[Budget/API] Add success', props<{tempId: BudgetId; budget: Budget}>());
export const addFailure = createAction('[Budget/API] Add failure', props<{tempId: BudgetId; error: Error}>());

export const editSuccess = createAction('[Budget/API] Edit success', props<{budget: Budget}>());
export const editFailure = createAction('[Budget/API] Edit failure', props<{id: BudgetId; error: Error}>());

export const removeSuccess = createAction('[Budget/API] Remove success', props<{id: BudgetId}>());
export const removeFailure = createAction('[Budget/API] Remove failure', props<{id: BudgetId; error: Error}>());

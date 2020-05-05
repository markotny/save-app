import {createAction, props} from '@ngrx/store';
import {Budget} from '@wydatex/models';

export const actionBudgetAdd = createAction('[Budget] Add', props<{budget: Budget}>());

export const actionBudgetDelete = createAction('[Budget] Delete', props<{id: number}>());

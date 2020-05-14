import {createAction, props} from '@ngrx/store';
import {Budget} from './budgets.model';
import {BudgetVM, BudgetDetailsVM, BudgetDto} from '@wydatex/models';
import {Id} from '@shared/types';
import {crudActionsPublic, ApiModule, crudActionsInternal} from '@shared/state';

export const BudgetActionsPublic = {
  ...crudActionsPublic<BudgetDto, BudgetVM>(ApiModule.Budget),

  setActive: createAction('[Budget] Set active', props<{id: Id<Budget>}>())
};

export const BudgetActions = {
  ...BudgetActionsPublic,
  ...crudActionsInternal<BudgetVM, BudgetDetailsVM>(ApiModule.Budget)
};

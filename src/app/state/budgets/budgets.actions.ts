import {createAction, props} from '@ngrx/store';
import {Budget} from './budgets.model';
import {BudgetVM, BudgetDetailsVM, BudgetDto} from '@wydatex/models';
import {Id} from '@shared/types';
import {crudActionsPublic, ApiModule, crudActionsInternal, crudActionsDialog} from '@shared/state';

export const BudgetActions = {
  ...crudActionsPublic<BudgetDto, BudgetVM>(ApiModule.Budget),
  ...crudActionsDialog<Budget>(ApiModule.Budget),

  setActive: createAction('[Budget] Set active', props<{id: Id<Budget>}>()),

  editActiveDialog: createAction('[Budget] Edit active dialog'),
  removeActiveDialog: createAction('[Budget] Remove active dialog')
};

export const BudgetActionsAll = {
  ...BudgetActions,
  ...crudActionsInternal<BudgetVM, BudgetDetailsVM>(ApiModule.Budget)
};

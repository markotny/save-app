import {createAction, props} from '@ngrx/store';
import {Budget} from './budgets.model';
import {BudgetVM, BudgetDetailsVM, BudgetDto} from '@wydatex/models';
import {Id, randomId} from '@shared/types';
import {crudActionsPublic, ApiModule, crudActionsInternal, crudActionsDialog} from '@shared/state';

export const BudgetActions = {
  ...crudActionsPublic<BudgetDto, BudgetVM>(ApiModule.Budget),
  ...crudActionsDialog<Budget>(ApiModule.Budget),

  add: createAction(`[Budget] Add`, (item: BudgetDto, setActive: boolean) => ({tempId: randomId(), item, setActive})),

  setActive: createAction('[Budget] Set active', props<{id: Id<Budget>}>()),

  editActiveDialog: createAction('[Budget] Edit active dialog'),
  removeActiveDialog: createAction('[Budget] Remove active dialog')
};

export const BudgetActionsAll = {
  ...BudgetActions,
  ...crudActionsInternal<BudgetVM, BudgetDetailsVM>(ApiModule.Budget),

  setActiveSuccess: createAction(`[Budget/API] Set active success`),
  setActiveFailure: createAction(`[Budget/API] Set active failure`, props<{error: Error}>())
};

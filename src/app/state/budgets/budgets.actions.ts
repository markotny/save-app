import {createAction, props} from '@ngrx/store';
import {Budget} from './budgets.model';
import {BudgetVM, BudgetDetailsVM, BudgetDto} from '@wydatex/models';
import {Id} from '@shared/types';
import {crudActions, ApiModule} from '@shared/state';

export const BudgetActions = {
  ...crudActions<BudgetDto, BudgetVM, BudgetDetailsVM>(ApiModule.Budget),

  setActive: createAction('[Budget] Set active', props<{id: Id<Budget>}>())
};

import {IncomeDto, IncomeVM} from '@wydatex/models';
import {crudActionsPublic, ApiModule, crudActionsInternal} from '@shared/state';

export const IncomeActions = crudActionsPublic<IncomeDto, IncomeVM>(ApiModule.Income);

export const IncomeActionsAll = {
  ...IncomeActions,
  ...crudActionsInternal<IncomeVM>(ApiModule.Income)
};

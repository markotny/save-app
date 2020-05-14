import {IncomeDto, IncomeVM} from '@wydatex/models';
import {crudActionsPublic, ApiModule, crudActionsInternal} from '@shared/state';

export const IncomeActionsPublic = crudActionsPublic<IncomeDto, IncomeVM>(ApiModule.Income);

export const IncomeActions = {
  ...IncomeActionsPublic,
  ...crudActionsInternal<IncomeVM>(ApiModule.Income)
};

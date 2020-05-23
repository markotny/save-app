import {IncomeDto, IncomeVM} from '@wydatex/models';
import {crudActionsPublic, ApiModule, crudActionsInternal, crudActionsDialog} from '@shared/state';
import {Income} from './incomes.model';

export const IncomeActions = {
  ...crudActionsPublic<IncomeDto, IncomeVM>(ApiModule.Income),
  ...crudActionsDialog<Income>(ApiModule.Income)
};

export const IncomeActionsAll = {
  ...IncomeActions,
  ...crudActionsInternal<IncomeVM>(ApiModule.Income)
};

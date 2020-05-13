import {IncomeDto, IncomeVM} from '@wydatex/models';
import {crudActions, ApiModule} from '@shared/state';
import {Income} from './incomes.model';

export const IncomeActions = crudActions<Income, IncomeDto, IncomeVM>(ApiModule.Income);

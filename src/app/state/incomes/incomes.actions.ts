import {IncomeDto, IncomeVM} from '@wydatex/models';
import {crudActions, ApiModule} from '@shared/state';

export const IncomeActions = crudActions<IncomeDto, IncomeVM>(ApiModule.Income);

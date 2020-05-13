import {CategoryVM, CategoryDto} from '@wydatex/models';
import {crudActions, ApiModule} from '@shared/state';

export const CategoryActions = crudActions<CategoryDto, CategoryVM>(ApiModule.Category);

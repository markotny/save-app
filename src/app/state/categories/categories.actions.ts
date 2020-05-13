import {Category} from './categories.model';
import {CategoryVM, CategoryDto} from '@wydatex/models';
import {crudActions, ApiModule} from '@shared/state';

export const CategoryActions = crudActions<Category, CategoryDto, CategoryVM>(ApiModule.Category);

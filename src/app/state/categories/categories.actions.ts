import {CategoryVM, CategoryDto} from '@wydatex/models';
import {crudActionsPublic, ApiModule, crudActionsInternal} from '@shared/state';

export const CategoryActionsPublic = crudActionsPublic<CategoryDto, CategoryVM>(ApiModule.Category);

export const CategoryActions = {
  ...CategoryActionsPublic,
  ...crudActionsInternal<CategoryVM>(ApiModule.Category)
};

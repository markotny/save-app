import {CategoryVM, CategoryDto} from '@wydatex/models';
import {crudActionsPublic, ApiModule, crudActionsInternal} from '@shared/state';

export const CategoryActions = crudActionsPublic<CategoryDto, CategoryVM>(ApiModule.Category);

export const CategoryActionsAll = {
  ...CategoryActions,
  ...crudActionsInternal<CategoryVM>(ApiModule.Category)
};

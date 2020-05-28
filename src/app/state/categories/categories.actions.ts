import {CategoryVM, CategoryDto} from '@wydatex/models';
import {crudActionsPublic, ApiModule, crudActionsInternal, crudActionsDialog} from '@shared/state';
import {Category} from './categories.model';

export const CategoryActions = {
  ...crudActionsPublic<CategoryDto, CategoryVM>(ApiModule.Category),
  ...crudActionsDialog<Category>(ApiModule.Category)
};

export const CategoryActionsAll = {
  ...CategoryActions,
  ...crudActionsInternal<CategoryVM>(ApiModule.Category)
};

import {adapter} from './categories.reducer';
import {createSelector} from '@ngrx/store';
import {Id} from '@shared/types';
import {selectCategoryState} from '@state/data.state';
import {Category} from './categories.model';

const {selectAll, selectEntities} = adapter.getSelectors();

export const selectAllCategories = createSelector(selectCategoryState, selectAll);
export const selectCategoryEntities = createSelector(selectCategoryState, selectEntities);

export const selectCategories = (ids: Id<Category>[]) =>
  createSelector(selectAllCategories, categories => categories.filter(c => ids.includes(c.id)));

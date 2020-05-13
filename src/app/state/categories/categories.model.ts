import {CategoryVM} from '@wydatex/models';
import {Unsaved} from '@shared/types';
import {EntityState} from '@ngrx/entity';

export type Category = CategoryVM & Unsaved;

export interface CategoryState extends EntityState<Category> {}

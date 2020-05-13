import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {CategoryService} from './categories.service';
import {Category} from './categories.model';
import {CategoryVM, CategoryDto} from '@wydatex/models';
import {CrudEffects} from '@shared/state';

@Injectable()
export class CategoryEffects extends CrudEffects<Category, CategoryDto, CategoryVM> {
  constructor(actions$: Actions, service: CategoryService) {
    super(actions$, service);
  }
}

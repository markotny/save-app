import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoryVM, CategoryDto} from '@wydatex/models';
import {CrudService, ApiModule} from '@shared/state';

@Injectable({providedIn: 'root'})
export class CategoryService extends CrudService<CategoryDto, CategoryVM> {
  constructor(http: HttpClient) {
    super(http, ApiModule.Category);
  }
}

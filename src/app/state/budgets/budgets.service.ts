import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BudgetVM, BudgetDto} from '@wydatex/models';
import {CrudService, ApiModule} from '@shared/state';
import {Id} from '@shared/types';

@Injectable({providedIn: 'root'})
export class BudgetService extends CrudService<BudgetDto, BudgetVM> {
  constructor(http: HttpClient) {
    super(http, ApiModule.Budget);
  }

  setActive(id: Id<BudgetVM>) {
    return this.http.patch(`${this.apiPath}/${id}/activate`, {});
  }
}

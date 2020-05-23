import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BudgetVM, BudgetDto, BudgetDetailsVM} from '@wydatex/models';
import {CrudService, ApiModule} from '@shared/state';

@Injectable({providedIn: 'root'})
export class BudgetService extends CrudService<BudgetDto, BudgetVM> {
  constructor(http: HttpClient) {
    super(http, ApiModule.Budget);
  }

  add(item: BudgetDto, setActive = false) {
    return this.http.post<BudgetDetailsVM>(this.apiPath, item, {params: {setActive: setActive ? 'true' : 'false'}});
  }
}

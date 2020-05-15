import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IncomeDto, IncomeVM} from '@wydatex/models';
import {CrudService, ApiModule} from '@shared/state';

@Injectable({providedIn: 'root'})
export class IncomeService extends CrudService<IncomeDto, IncomeVM> {
  constructor(http: HttpClient) {
    super(http, ApiModule.Income);
  }
}

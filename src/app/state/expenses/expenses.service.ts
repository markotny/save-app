import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExpenseVM, ExpenseDto} from '@wydatex/models';
import {CrudService, ApiModule} from '@shared/state';

@Injectable({providedIn: 'root'})
export class ExpenseService extends CrudService<ExpenseDto, ExpenseVM> {
  constructor(http: HttpClient) {
    super(http, ApiModule.Expense);
  }
}

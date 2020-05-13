import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {ExpenseService} from './expenses.service';
import {ExpenseDto, ExpenseVM} from '@wydatex/models';
import {CrudEffects} from '@shared/state';
import {Expense} from './expenses.model';

@Injectable()
export class ExpenseEffects extends CrudEffects<Expense, ExpenseDto, ExpenseVM> {
  constructor(actions$: Actions, service: ExpenseService) {
    super(actions$, service);
  }
}

import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {IncomeDto, IncomeVM} from '@wydatex/models';
import {CrudEffects} from '@shared/state';
import {IncomeService} from './incomes.service';

@Injectable()
export class IncomeEffects extends CrudEffects<IncomeDto, IncomeVM> {
  constructor(actions$: Actions, service: IncomeService) {
    super(actions$, service);
  }
}

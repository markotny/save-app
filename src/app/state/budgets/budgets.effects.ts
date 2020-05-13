import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {BudgetService} from './budgets.service';
import {BudgetDto, BudgetVM} from '@wydatex/models';
import {CrudEffects} from '@shared/state';

@Injectable()
export class BudgetEffects extends CrudEffects<BudgetDto, BudgetVM> {
  constructor(actions$: Actions, service: BudgetService) {
    super(actions$, service);
  }
}

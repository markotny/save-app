import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {BudgetService} from './budgets.service';
import {BudgetDto, BudgetVM} from '@wydatex/models';
import {Budget} from './budgets.model';
import {CrudEffects} from '@shared/state';

@Injectable()
export class BudgetEffects extends CrudEffects<Budget, BudgetDto, BudgetVM> {
  constructor(actions$: Actions, service: BudgetService) {
    super(actions$, service);
  }
}

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {BudgetService} from './budgets.service';
import {BudgetDto, BudgetVM} from '@wydatex/models';
import {CrudEffects} from '@shared/state';
import {BudgetActionsAll as BudgetActions} from './budgets.actions';
import {map} from 'rxjs/operators';

@Injectable()
export class BudgetEffects extends CrudEffects<BudgetDto, BudgetVM> {
  constructor(actions$: Actions, service: BudgetService) {
    super(actions$, service);
  }

  findActive$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.loadSuccess),
      map(({items}) => items.find(b => b.isActive)),
      map(b => b && BudgetActions.setActive(b))
    )
  );

  loadDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.setActive),
      map(({id}) => BudgetActions.getDetails({id}))
    )
  );
}

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {BudgetService} from './budgets.service';
import {BudgetDto, BudgetVM} from '@wydatex/models';
import {CrudEffects} from '@shared/state';
import {BudgetActionsAll as BudgetActions} from './budgets.actions';
import {map, switchMap, catchError, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import * as BudgetSelectors from './budgets.selectors';
import {AppState} from '@core/core.state';

@Injectable()
export class BudgetEffects extends CrudEffects<BudgetDto, BudgetVM, BudgetService> {
  constructor(actions$: Actions, service: BudgetService, private store: Store<AppState>) {
    super(actions$, service);
  }

  loadActive$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.loadSuccess, BudgetActions.setActiveSuccess),
      withLatestFrom(this.store.select(BudgetSelectors.activeId)),
      map(([, id]) => id && BudgetActions.getDetails({id}))
    )
  );

  setActive$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.setActive),
      switchMap(({id}) =>
        this.service.setActive(id).pipe(
          map(() => BudgetActions.setActiveSuccess()),
          catchError(error => of(BudgetActions.setActiveFailure({error})))
        )
      )
    )
  );
}

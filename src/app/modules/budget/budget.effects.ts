import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {BudgetState} from './budget.state';
import {map, catchError, exhaustMap, withLatestFrom, filter, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {BudgetService} from './budget.service';
import {selectAllBudgets, selectBudgetEntities} from './budget.selectors';
import {logValue} from '@core/core.module';
import * as BudgetActions from './budget.actions';

@Injectable()
export class BudgetEffects {
  constructor(private actions$: Actions, private store: Store<BudgetState>, private service: BudgetService) {}

  loadBudgets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.load),
      withLatestFrom(this.store.select(selectAllBudgets)),
      filter(([, budgets]) => !(budgets && budgets.length)),
      exhaustMap(() =>
        this.service.getList().pipe(
          map(data => BudgetActions.loadSuccess({budgets: data})),
          catchError(error => of(BudgetActions.loadFailure({error})))
        )
      )
    )
  );

  addBudget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.add),
      mergeMap(budget =>
        this.service.add(budget).pipe(
          map(data => BudgetActions.addSuccess({changeId: budget.changeId, budget: data})),
          catchError(error => of(BudgetActions.addFailure({changeId: budget.changeId, error})))
        )
      )
    )
  );

  editBudget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.edit),
      withLatestFrom(this.store.select(selectBudgetEntities)),
      mergeMap(([{changeId}, budgets]) =>
        this.service.edit(budgets[changeId]).pipe(
          map(data => BudgetActions.editSuccess({changeId, budget: data})),
          catchError(error => of(BudgetActions.editFailure({changeId, error})))
        )
      )
    )
  );

  removeBudget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.remove),
      mergeMap(({id, changeId}) =>
        this.service.remove(id).pipe(
          map(() => BudgetActions.removeSuccess({changeId})),
          catchError(error => of(BudgetActions.removeFailure({changeId, error})))
        )
      )
    )
  );
}

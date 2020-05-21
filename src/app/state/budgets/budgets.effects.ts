import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {BudgetService} from './budgets.service';
import {BudgetDto, BudgetVM} from '@wydatex/models';
import {CrudEffects} from '@shared/state';
import {BudgetActionsAll as BudgetActions} from './budgets.actions';
import {map, withLatestFrom, exhaustMap, switchMap} from 'rxjs/operators';
import * as BudgetSelectors from './budgets.selectors';
import {AppState} from '@core/core.state';
import {Store} from '@ngrx/store';
import {DialogService} from 'primeng/dynamicdialog';
import {BudgetEditComponent} from '@modules/budget';
import {logValue} from '@core/index';
import { of } from 'rxjs';

@Injectable()
export class BudgetEffects extends CrudEffects<BudgetDto, BudgetVM> {
  constructor(actions$: Actions, service: BudgetService, private store: Store<AppState>, private dialogService: DialogService) {
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

  editActive$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.editActiveDialog),
      withLatestFrom(this.store.select(BudgetSelectors.active)),
      map(([, item]) => BudgetActions.editDialog({item}))
    )
  );

  edit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.editDialog),
      switchMap(({item: {id, isActive, unsaved, ...item}}) => {
        const ref = this.dialogService.open(BudgetEditComponent, {
          data: {id, item},
          header: 'Edit budget'
        });
        return of({});
        // return ref.onClose.pipe(
        //   logValue('eff'),
        //   map(res => BudgetActions.edit(res))
        // );
      })
    ),
    {dispatch: false}
  );
}

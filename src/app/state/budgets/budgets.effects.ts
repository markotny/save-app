/* eslint-disable @typescript-eslint/no-unused-vars */
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {BudgetService} from './budgets.service';
import {BudgetDto, BudgetVM} from '@wydatex/models';
import {CrudEffects} from '@shared/state';
import {BudgetActionsAll as BudgetActions} from './budgets.actions';
import {map, withLatestFrom, exhaustMap, first} from 'rxjs/operators';
import * as BudgetSelectors from './budgets.selectors';
import {AppState} from '@core/core.state';
import {Store} from '@ngrx/store';
import {DialogService} from 'primeng/dynamicdialog';
import {BudgetEditComponent} from '@modules/budget';
import {ModalRemoveComponent} from '@shared/components';
import {CategorySelectors} from '@state/categories';

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

  removeActive$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.removeActiveDialog),
      withLatestFrom(this.store.select(BudgetSelectors.activeId)),
      map(([, id]) => BudgetActions.removeDialog({id}))
    )
  );

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.addDialog),
      withLatestFrom(this.store.select(CategorySelectors.all)),
      exhaustMap(([, categories]) =>
        this.dialogService
          .open(BudgetEditComponent, {
            data: {categories},
            header: 'Add budget'
          })
          .onClose.pipe(
            first(),
            map((item: BudgetDto) => (item ? BudgetActions.add(item) : BudgetActions.dialogCancel()))
          )
      )
    )
  );

  edit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.editDialog),
      withLatestFrom(this.store.select(CategorySelectors.all)),
      exhaustMap(([{item: {id, isActive, unsaved, ...value}}, categories]) =>
        this.dialogService
          .open(BudgetEditComponent, {
            data: {value, categories},
            header: 'Edit budget'
          })
          .onClose.pipe(
            first(),
            map((item: BudgetDto) => (item ? BudgetActions.edit({id, item}) : BudgetActions.dialogCancel()))
          )
      )
    )
  );

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.removeDialog),
      exhaustMap(({id}) =>
        this.dialogService
          .open(ModalRemoveComponent, {
            data: {prompt: 'Delete this budget?'}
          })
          .onClose.pipe(
            first(),
            map(confirm => (confirm ? BudgetActions.remove({id}) : BudgetActions.dialogCancel()))
          )
      )
    )
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {BudgetService} from './budgets.service';
import {BudgetDto, BudgetVM} from '@wydatex/models';
import {CrudEffects} from '@shared/state';
import {BudgetActionsAll as BudgetActions} from './budgets.actions';
import {map, withLatestFrom, exhaustMap, first, filter, mergeMap, catchError, switchMap} from 'rxjs/operators';
import * as BudgetSelectors from './budgets.selectors';
import {AppState} from '@core/core.state';
import {Store} from '@ngrx/store';
import {DialogService} from 'primeng/dynamicdialog';
import {BudgetEditComponent} from '@modules/budget';
import {ModalRemoveComponent} from '@shared/components';
import {CategorySelectors} from '@state/categories';
import {of} from 'rxjs';

@Injectable()
export class BudgetEffects extends CrudEffects<BudgetDto, BudgetVM, BudgetService> {
  constructor(actions$: Actions, service: BudgetService, private store: Store<AppState>, private dialogService: DialogService) {
    super(actions$, service);
  }

  additem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.add),
      mergeMap(({tempId, item, setActive}) =>
        this.service.add(item, setActive).pipe(
          map(data => BudgetActions.addSuccess({tempId, item: data})),
          catchError(error => of(BudgetActions.addFailure({tempId, error})))
        )
      )
    )
  );

  loadActive$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.loadSuccess, BudgetActions.setActive),
      withLatestFrom(this.store.select(BudgetSelectors.activeId)),
      filter(([, id]) => !!id),
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
            data: {showActiveSelection: true, categories},
            header: 'Add budget'
          })
          .onClose.pipe(
            first(),
            map((item: BudgetDto & {setActive: boolean}) => {
              if (item) {
                const {setActive, ...dto} = item;
                return BudgetActions.add(dto, setActive);
              } else {
                return BudgetActions.dialogCancel();
              }
            })
          )
      )
    )
  );

  edit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.editDialog),
      withLatestFrom(this.store.select(CategorySelectors.all)),
      exhaustMap(([{item: {id, unsaved, ...value}}, categories]) =>
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

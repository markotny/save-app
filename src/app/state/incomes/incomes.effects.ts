import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {IncomeDto, IncomeVM} from '@wydatex/models';
import {CrudEffects} from '@shared/state';
import {IncomeService} from './incomes.service';
import {IncomeActionsAll as IncomeActions} from './incomes.actions';
import {withLatestFrom, exhaustMap, first, map} from 'rxjs/operators';
import {BudgetSelectors} from '@state/budgets';
import {ModalRemoveComponent} from '@shared/components';
import {Store} from '@ngrx/store';
import {AppState} from '@core/index';
import {DialogService} from 'primeng/dynamicdialog';
import {IncomeEditComponent} from '@shared/components/income-edit/income-edit.component';

@Injectable()
export class IncomeEffects extends CrudEffects<IncomeDto, IncomeVM> {
  constructor(actions$: Actions, service: IncomeService, private store: Store<AppState>, private dialogService: DialogService) {
    super(actions$, service);
  }

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomeActions.addDialog),
      withLatestFrom(this.store.select(BudgetSelectors.active), this.store.select(BudgetSelectors.all)),
      exhaustMap(([, activeBudget, budgets]) =>
        this.dialogService
          .open(IncomeEditComponent, {
            header: 'Add income',
            data: {activeBudget, budgets}
          })
          .onClose.pipe(
            first(),
            map((item: IncomeDto) => (item ? IncomeActions.add(item) : IncomeActions.dialogCancel()))
          )
      )
    )
  );

  edit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomeActions.editDialog),
      withLatestFrom(this.store.select(BudgetSelectors.active), this.store.select(BudgetSelectors.all)),
      exhaustMap(([{item: {id, unsaved, ...value}}, activeBudget, budgets]) =>
        this.dialogService
          .open(IncomeEditComponent, {
            header: 'Edit income',
            data: {value, activeBudget, budgets}
          })
          .onClose.pipe(
            first(),
            map((item: IncomeDto) => (item ? IncomeActions.edit({id, item}) : IncomeActions.dialogCancel()))
          )
      )
    )
  );

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomeActions.removeDialog),
      exhaustMap(({id}) =>
        this.dialogService
          .open(ModalRemoveComponent, {
            data: {
              prompt: 'Delete this income?'
            }
          })
          .onClose.pipe(
            first(),
            map(confirm => (confirm ? IncomeActions.remove({id}) : IncomeActions.dialogCancel()))
          )
      )
    )
  );
}

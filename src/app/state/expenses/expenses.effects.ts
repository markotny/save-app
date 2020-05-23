import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ExpenseService} from './expenses.service';
import {ExpenseDto, ExpenseVM} from '@wydatex/models';
import {CrudEffects} from '@shared/state';
import {ExpenseActionsAll as ExpenseActions} from './expenses.actions';
import {DialogService} from 'primeng/dynamicdialog';
import {exhaustMap, first, map, withLatestFrom} from 'rxjs/operators';
import {ModalRemoveComponent} from '@shared/components';
import {ExpenseEditComponent} from '@shared/components/expense-edit/expense-edit.component';
import {Store} from '@ngrx/store';
import {AppState} from '@core/index';
import * as BudgetSelectors from '@state/budgets/budgets.selectors';
import * as CategorySelectors from '@state/categories/categories.selectors';

@Injectable()
export class ExpenseEffects extends CrudEffects<ExpenseDto, ExpenseVM> {
  constructor(actions$: Actions, service: ExpenseService, private store: Store<AppState>, private dialogService: DialogService) {
    super(actions$, service);
  }

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.addDialog),
      withLatestFrom(
        this.store.select(BudgetSelectors.active),
        this.store.select(BudgetSelectors.all),
        this.store.select(CategorySelectors.all)
      ),
      exhaustMap(([, activeBudget, budgets, categories]) =>
        this.dialogService
          .open(ExpenseEditComponent, {
            header: 'Add expense',
            data: {activeBudget, budgets, categories}
          })
          .onClose.pipe(
            first(),
            map((item: ExpenseDto) => (item ? ExpenseActions.add(item) : ExpenseActions.dialogCancel()))
          )
      )
    )
  );

  edit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.editDialog),
      withLatestFrom(
        this.store.select(BudgetSelectors.active),
        this.store.select(BudgetSelectors.all),
        this.store.select(CategorySelectors.all)
      ),
      exhaustMap(([{item: {id, unsaved, ...value}}, activeBudget, budgets, categories]) =>
        this.dialogService
          .open(ExpenseEditComponent, {
            header: 'Edit expense',
            data: {value, activeBudget, budgets, categories}
          })
          .onClose.pipe(
            first(),
            map((item: ExpenseDto) => (item ? ExpenseActions.edit({id, item}) : ExpenseActions.dialogCancel()))
          )
      )
    )
  );

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.removeDialog),
      exhaustMap(({id}) =>
        this.dialogService
          .open(ModalRemoveComponent, {
            data: {
              prompt: 'Delete this expense?'
            }
          })
          .onClose.pipe(
            first(),
            map(confirm => (confirm ? ExpenseActions.remove({id}) : ExpenseActions.dialogCancel()))
          )
      )
    )
  );
}

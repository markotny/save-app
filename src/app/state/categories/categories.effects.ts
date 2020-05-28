import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CategoryService} from './categories.service';
import {CategoryVM, CategoryDto} from '@wydatex/models';
import {CrudEffects} from '@shared/state';
import {CategoryActionsAll as CategoryActions} from './categories.actions';
import {exhaustMap, first, map} from 'rxjs/operators';
import {ModalRemoveComponent} from '@shared/components';
import {CategoryEditComponent} from '@shared/components/category-edit/category-edit.component';
import {DialogService} from 'primeng/dynamicdialog';

@Injectable()
export class CategoryEffects extends CrudEffects<CategoryDto, CategoryVM> {
  constructor(actions$: Actions, service: CategoryService, private dialogService: DialogService) {
    super(actions$, service);
  }

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.addDialog),
      exhaustMap(() =>
        this.dialogService
          .open(CategoryEditComponent, {
            header: 'Add category'
          })
          .onClose.pipe(
            first(),
            map((item: CategoryDto) => (item ? CategoryActions.add(item) : CategoryActions.dialogCancel()))
          )
      )
    )
  );

  edit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.editDialog),
      exhaustMap(({item: {id, name}}) =>
        this.dialogService
          .open(CategoryEditComponent, {
            data: {value: {name}},
            header: 'Edit category'
          })
          .onClose.pipe(
            first(),
            map((item: CategoryDto) => (item ? CategoryActions.edit({id, item}) : CategoryActions.dialogCancel()))
          )
      )
    )
  );

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.removeDialog),
      exhaustMap(({id}) =>
        this.dialogService
          .open(ModalRemoveComponent, {
            data: {
              prompt: 'Delete this category?',
              warningText: 'You will not be able to recover it.\nAll your expenses within this category will be deleted as well.'
            }
          })
          .onClose.pipe(
            first(),
            map(confirm => (confirm ? CategoryActions.remove({id}) : CategoryActions.dialogCancel()))
          )
      )
    )
  );
}

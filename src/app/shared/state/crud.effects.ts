import {CrudService} from './crud.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ModelBase} from '@wydatex/models';
import {exhaustMap, map, catchError, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {crudActions} from './crud.actions';

export abstract class CrudEffects<
  DTO extends Partial<VM>,
  VM extends ModelBase,
  Service extends CrudService<DTO, VM> = CrudService<DTO, VM>
> {
  private crud = crudActions<DTO, VM>(this.service.module);

  constructor(protected actions$: Actions, protected service: Service) {}

  loaditems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.crud.load),
      exhaustMap(() =>
        this.service.getList().pipe(
          map(data => this.crud.loadSuccess({items: data})),
          catchError(error => of(this.crud.loadFailure({error})))
        )
      )
    )
  );

  getDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.crud.getDetails),
      mergeMap(({id}) =>
        this.service.get(id).pipe(
          map(data => this.crud.getDetailsSuccess({item: data})),
          catchError(error => of(this.crud.getDetailsFailure({error})))
        )
      )
    )
  );

  additem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.crud.add),
      mergeMap(({tempId, item}) =>
        this.service.add(item).pipe(
          map(data => this.crud.addSuccess({tempId, item: data})),
          catchError(error => of(this.crud.addFailure({tempId, error})))
        )
      )
    )
  );

  edititem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.crud.edit),
      mergeMap(({id, item}) =>
        this.service.edit(id, item).pipe(
          map(data => this.crud.editSuccess({item: data})),
          catchError(error => of(this.crud.editFailure({id, error})))
        )
      )
    )
  );

  removeitem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.crud.remove),
      mergeMap(({id}) =>
        this.service.remove(id).pipe(
          map(() => this.crud.removeSuccess({id})),
          catchError(error => of(this.crud.removeFailure({id, error})))
        )
      )
    )
  );
}

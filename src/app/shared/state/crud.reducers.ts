import {crudActions} from './crud.actions';
import {ModelBase} from '@wydatex/models';
import {ApiModule} from './api-module.enum';
import {EntityAdapter, EntityState} from '@ngrx/entity';
import {on} from '@ngrx/store';
import {Unsaved} from '@shared/types';

type Entity<T> = T extends EntityState<infer E> ? E : never;

export const crudReducers = <State extends EntityState<ModelBase & Unsaved>>(
  module: ApiModule,
  adapter: EntityAdapter<ModelBase & Unsaved>,
  noSuccess = false
) => {
  const crud = crudActions<Entity<State>, Entity<State>>(module);
  const basic = [
    on(crud.add, (state: State, {tempId, item}) => adapter.addOne({id: tempId, unsaved: 'add', ...item}, state)),
    on(crud.edit, (state: State, {id, item}) => adapter.updateOne({id, changes: {unsaved: 'edit', ...item}}, state)),
    on(crud.remove, (state: State, {id}) => adapter.updateOne({id, changes: {unsaved: 'remove'}}, state))
  ];
  return noSuccess
    ? basic
    : [
        ...basic,
        on(crud.loadSuccess, (state: State, {items}) => adapter.setAll(items, state)),
        on(crud.addSuccess, (state: State, {tempId, item}) =>
          adapter.updateOne({id: tempId, changes: {unsaved: undefined, ...item}}, state)
        ),
        on(crud.editSuccess, (state: State, {item}) => adapter.setOne(item, state)),
        on(crud.removeSuccess, (state: State, {id}) => adapter.removeOne(id, state))
      ];
};

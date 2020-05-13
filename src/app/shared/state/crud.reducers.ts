import {crudActions} from './crud.actions';
import {ModelBase} from '@wydatex/models';
import {ApiModule} from './api-module.enum';
import {EntityAdapter, EntityState} from '@ngrx/entity';
import {on} from '@ngrx/store';
import {Unsaved} from '@shared/types';

export const crudReducers = <VM extends ModelBase>(module: ApiModule, adapter: EntityAdapter<ModelBase & Unsaved>) => {
  const crud = crudActions<VM, VM>(module);
  type Entity = VM & Unsaved;
  return [
    on<typeof crud.loadSuccess, EntityState<Entity>>(crud.loadSuccess, (state, {items}) => adapter.setAll(items, state)),
    on<typeof crud.add, EntityState<Entity>>(crud.add, (state, {tempId, item}) =>
      adapter.addOne({id: tempId, unsaved: 'add', ...item}, state)
    ),
    on<typeof crud.addSuccess, EntityState<Entity>>(crud.addSuccess, (state, {tempId, item}) =>
      adapter.updateOne({id: tempId, changes: {unsaved: undefined, ...item}}, state)
    ),
    on<typeof crud.edit, EntityState<Entity>>(crud.edit, (state, {id, item}) =>
      adapter.updateOne({id, changes: {unsaved: 'edit', ...item}}, state)
    ),
    on<typeof crud.editSuccess, EntityState<Entity>>(crud.editSuccess, (state, {item}) => adapter.setOne(item, state)),
    on<typeof crud.remove, EntityState<Entity>>(crud.remove, (state, {id}) => adapter.updateOne({id, changes: {unsaved: 'remove'}}, state)),
    on<typeof crud.removeSuccess, EntityState<Entity>>(crud.removeSuccess, (state, {id}) => adapter.removeOne(id, state))
  ];
};

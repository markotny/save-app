import {createAction, props} from '@ngrx/store';
import {ModelBase} from '@wydatex/models';
import {randomId, Id, Unsaved} from '@shared/types';
import {ApiModule} from './api-module.enum';

export const crudActions = <DTO extends Partial<VM>, VM extends ModelBase, VMExtended extends VM = VM>(module: ApiModule) => {
  const name = ApiModule[module];
  type Entity = VM & Unsaved;
  return {
    load: createAction(`[${name}] Load`),
    getDetails: createAction(`[${name}] Get details`, props<{id: Id<Entity>}>()),
    add: createAction(`[${name}] Add`, (item: DTO) => ({tempId: randomId(), item})),
    edit: createAction(`[${name}] Edit`, props<{id: Id<Entity>; item: DTO}>()),
    remove: createAction(`[${name}] Remove`, props<{id: Id<Entity>}>()),

    loadSuccess: createAction(`[${name}/API] Load success`, props<{items: VM[]}>()),
    loadFailure: createAction(`[${name}/API] Load failure`, props<{error: Error}>()),

    getDetailsSuccess: createAction(`[${name}/API] Get details success`, props<{item: VMExtended}>()),
    getDetailsFailure: createAction(`[${name}/API] Get details failure`, props<{error: Error}>()),

    addSuccess: createAction(`[${name}/API] Add success`, props<{tempId: Id<Entity>; item: VMExtended}>()),
    addFailure: createAction(`[${name}/API] Add failure`, props<{tempId: Id<Entity>; error: Error}>()),

    editSuccess: createAction(`[${name}/API] Edit success`, props<{item: VMExtended}>()),
    editFailure: createAction(`[${name}/API] Edit failure`, props<{id: Id<Entity>; error: Error}>()),

    removeSuccess: createAction(`[${name}/API] Remove success`, props<{id: Id<Entity>}>()),
    removeFailure: createAction(`[${name}/API] Remove failure`, props<{id: Id<Entity>; error: Error}>())
  };
};

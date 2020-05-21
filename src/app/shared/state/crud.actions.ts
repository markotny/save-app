import {createAction, props} from '@ngrx/store';
import {ModelBase} from '@wydatex/models';
import {randomId, Id} from '@shared/types';
import {ApiModule} from './api-module.enum';

export const crudActionsDialog = <Model extends ModelBase>(module: ApiModule) => {
  const name = ApiModule[module];
  return {
    addDialog: createAction(`[${name}] Add dialog`),
    editDialog: createAction(`[${name}] Edit dialog`, props<{item: Model}>()),
    removeDialog: createAction(`[${name}] Remove dialog`, props<{id: Id<Model>}>())
  };
};

export const crudActionsPublic = <DTO extends Partial<VM>, VM extends ModelBase>(module: ApiModule) => {
  const name = ApiModule[module];
  return {
    load: createAction(`[${name}] Load`),
    getDetails: createAction(`[${name}] Get details`, props<{id: Id<VM>}>()),
    add: createAction(`[${name}] Add`, (item: DTO) => ({tempId: randomId(), item})),
    edit: createAction(`[${name}] Edit`, props<{id: Id<VM>; item: DTO}>()),
    remove: createAction(`[${name}] Remove`, props<{id: Id<VM>}>())
  };
};

export const crudActionsInternal = <VM extends ModelBase, VMExtended extends VM = VM>(module: ApiModule) => {
  const name = ApiModule[module];
  return {
    loadSuccess: createAction(`[${name}/API] Load success`, props<{items: VM[]}>()),
    loadFailure: createAction(`[${name}/API] Load failure`, props<{error: Error}>()),

    getDetailsSuccess: createAction(`[${name}/API] Get details success`, props<{item: VMExtended}>()),
    getDetailsFailure: createAction(`[${name}/API] Get details failure`, props<{error: Error}>()),

    addSuccess: createAction(`[${name}/API] Add success`, props<{tempId: Id<VM>; item: VMExtended}>()),
    addFailure: createAction(`[${name}/API] Add failure`, props<{tempId: Id<VM>; error: Error}>()),

    editSuccess: createAction(`[${name}/API] Edit success`, props<{item: VMExtended}>()),
    editFailure: createAction(`[${name}/API] Edit failure`, props<{id: Id<VM>; error: Error}>()),

    removeSuccess: createAction(`[${name}/API] Remove success`, props<{id: Id<VM>}>()),
    removeFailure: createAction(`[${name}/API] Remove failure`, props<{id: Id<VM>; error: Error}>())
  };
};

export const crudActions = <DTO extends Partial<VM>, VM extends ModelBase, VMExtended extends VM = VM>(module: ApiModule) => ({
  ...crudActionsPublic<DTO, VM>(module),
  ...crudActionsInternal<VM, VMExtended>(module)
});

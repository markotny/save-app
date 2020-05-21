import {createAction, props} from '@ngrx/store';
import {ComponentType} from '@angular/cdk/portal';

export const open = createAction('[Modal] Open');
export const close = createAction('[Modal] Close');
export const set = createAction('[Modal] Set', props<{ref: ComponentType<unknown>}>());

import {createFeatureSelector} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {ComponentType} from '@angular/cdk/portal';

export const FEATURE_NAME = 'modal';
export const selectModal = createFeatureSelector<State, ModalState>(FEATURE_NAME);

export interface ModalState {
  open: boolean;
  ref: ComponentType<unknown> | undefined;
}

export interface State extends AppState {
  modal: ModalState;
}

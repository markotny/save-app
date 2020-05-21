import {createReducer, on, Action} from '@ngrx/store';
import {ModalState} from './modal.state';
import * as ModalActions from './modal.actions';

export const initialState: ModalState = {
  open: false,
  ref: undefined
};

const reducer = createReducer(
  initialState,
  on(ModalActions.open, state => ({...state, open: true})),
  on(ModalActions.close, state => ({...state, open: false})),
  on(ModalActions.set, (state, {ref}) => ({...state, ref}))
);

export function modalReducer(state: ModalState | undefined, action: Action) {
  return reducer(state, action);
}

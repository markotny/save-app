import {createSelector} from '@ngrx/store';
import {selectModal} from './modal.state';

export const selectOpen = createSelector(selectModal, state => state.open);

export const selectRef = createSelector(selectModal, state => state.ref);

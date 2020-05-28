import {createAction, props} from '@ngrx/store';

export const login = createAction('[Oidc] Login');
export const loginSuccess = createAction('[Oidc] Login success');

export const register = createAction('[Oidc] Register');
export const registerSuccess = createAction('[Oidc] Register success');

export const ensureRegistered = createAction('[User] Ensure registered');
export const ensureRegisteredSuccess = createAction('[User/API] Ensure registered success');
export const ensureRegisteredFailure = createAction('[User/API] Ensure registered failure', props<{payload: string}>());

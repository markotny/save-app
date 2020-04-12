import {createAction, props} from '@ngrx/store';

export const actionOidcRegister = createAction('[Oidc] Register');

export const actionOidcRegisterSuccess = createAction('[Oidc] Register Success');

// TODO: Separate actions per API module and move next to [module].service.ts
export const actionApiUserAddUserSuccess = createAction('[API/User] Add User Success');

export const actionApiUserAddUserFail = createAction('[API/User] Add User Fail', props<{error: any}>());

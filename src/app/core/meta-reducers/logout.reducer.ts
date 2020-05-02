import {ActionReducer} from '@ngrx/store';
import {AppState} from '../core.state';
import {OidcActions} from 'ng-oidc-client';

export function logout(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action): AppState => {
    if (action.type === OidcActions.OidcActionTypes.OnUserSignedOut) {
      return reducer(undefined, action);
    }
    return reducer(state, action);
  };
}

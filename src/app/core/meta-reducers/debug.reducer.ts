import {ActionReducer} from '@ngrx/store';

import {AppState} from '../core.state';

export function debug(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action): AppState => {
    const newState = reducer(state, action);
    console.log(`[DEBUG] action: ${action.type}`, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      payload: (action as any).payload,
      oldState: state,
      newState
    });
    return newState;
  };
}

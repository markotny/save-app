import {
  MetaReducer,
  createFeatureSelector,
  ActionReducerMap
} from '@ngrx/store';
import {logout} from './meta-reducers/logout.reducer';
import {environment} from '@env/environment';
import {debug} from './meta-reducers/debug.reducer';
import {SettingsState} from './settings/settings.model';
import {settingsReducer} from './settings/settings.reducer';

export const reducers: ActionReducerMap<AppState> = {
  settings: settingsReducer
};

export const metaReducers: MetaReducer<AppState>[] = [logout];

if (!environment.production) {
  if (!environment.test) {
    metaReducers.unshift(debug);
  }
}

export const selectSettingsState = createFeatureSelector<
  AppState,
  SettingsState
>('settings');

export interface AppState {
  settings: SettingsState;
}

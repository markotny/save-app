import {MetaReducer, createFeatureSelector, ActionReducerMap} from '@ngrx/store';
import {logout} from './meta-reducers/logout.reducer';
import {environment} from '@env/environment';
import {debug} from './meta-reducers/debug.reducer';
import {SettingsState} from './settings/settings.model';
import {settingsReducer} from './settings/settings.reducer';
import {initStateFromLocalStorage} from './meta-reducers/init-state-from-local-storage.reducer';
import {dataReducers, DataState} from '@state/data.state';

export const reducers: ActionReducerMap<AppState> = {
  ...dataReducers,
  settings: settingsReducer
};

export const metaReducers: MetaReducer<AppState>[] = [logout, initStateFromLocalStorage];

if (!environment.production) {
  if (!environment.test) {
    metaReducers.unshift(debug);
  }
}

export const selectSettingsState = createFeatureSelector<AppState, SettingsState>('settings');

export interface AppState extends DataState {
  settings: SettingsState;
}

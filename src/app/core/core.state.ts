import {MetaReducer, createFeatureSelector, ActionReducerMap} from '@ngrx/store';
import {logout} from './meta-reducers/logout.reducer';
import {SettingsState} from './settings/settings.model';
import {settingsReducer} from './settings/settings.reducer';
import {initStateFromLocalStorage} from './meta-reducers/init-state-from-local-storage.reducer';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import {RouterStateUrl} from './router/router.state';

export const reducers: ActionReducerMap<AppState> = {
  settings: settingsReducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] = [logout, initStateFromLocalStorage];

export const selectSettingsState = createFeatureSelector<AppState, SettingsState>('settings');

export const selectRouterState = createFeatureSelector<AppState, RouterReducerState<RouterStateUrl>>('router');

export interface AppState {
  settings: SettingsState;
  router: RouterReducerState<RouterStateUrl>;
}

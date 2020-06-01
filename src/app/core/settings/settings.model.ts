import {AppState} from '@core/index';

export const DARK_MODE_THEME = 'DARK-THEME';

export interface SettingsState {
  theme: string;
}

export interface State extends AppState {
  settings: SettingsState;
}

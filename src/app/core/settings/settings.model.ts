import {AppState} from '@core/core.module';

export const DARK_MODE_THEME = 'DARK-THEME';

export interface SettingsState {
  theme: string;
}

export interface State extends AppState {
  settings: SettingsState;
}

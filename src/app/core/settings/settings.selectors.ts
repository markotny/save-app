import {createSelector} from '@ngrx/store';
import {selectSettingsState} from '@core/core.state';
import {SettingsState} from './settings.model';

export const selectSettings = createSelector(
  selectSettingsState,
  (state: SettingsState) => state
);

export const selectTheme = createSelector(selectSettings, settings =>
  settings.theme.toLowerCase()
);

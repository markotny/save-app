import {actionSettingsChangeTheme} from './settings.actions';
import {DARK_MODE_THEME} from './settings.model';

describe('Settings Actions', () => {
  it('should create ActionSettingsChangeTheme action', () => {
    const action = actionSettingsChangeTheme({
      theme: DARK_MODE_THEME
    });

    expect(action.type).toEqual(actionSettingsChangeTheme.type);
    expect(action.theme).toEqual(DARK_MODE_THEME);
  });
});

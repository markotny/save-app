import * as assert from 'assert';
import {OverlayContainer} from '@angular/cdk/overlay';
import {Actions} from '@ngrx/effects';
import {TestScheduler} from 'rxjs/testing';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';

import {AppState, LocalStorageService} from '../core.module';

import {SettingsEffects, SETTINGS_KEY} from './settings.effects';
import {SettingsState} from './settings.model';
import {actionSettingsChangeTheme} from './settings.actions';

const scheduler = new TestScheduler((actual, expected) =>
  assert.deepStrictEqual(actual, expected)
);

describe('SettingsEffects', () => {
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let overlayContainer: jasmine.SpyObj<OverlayContainer>;
  let store: jasmine.SpyObj<Store<AppState>>;

  beforeEach(() => {
    localStorageService = jasmine.createSpyObj('LocalStorageService', [
      'setItem'
    ]);
    overlayContainer = jasmine.createSpyObj('OverlayContainer', [
      'getContainerElement'
    ]);
    store = jasmine.createSpyObj('store', ['pipe']);
  });

  it('should call methods on LocalStorageService for PERSIST action', () => {
    scheduler.run(helpers => {
      const {cold} = helpers;

      const settings: SettingsState = {
        theme: 'light'
      };
      store.pipe.and.returnValue(of(settings));
      const persistAction = actionSettingsChangeTheme({theme: 'LIGHT'});
      const source = cold('a', {a: persistAction});
      const actions = new Actions(source);
      const effect = new SettingsEffects(
        actions,
        store,
        overlayContainer,
        localStorageService
      );

      effect.persistSettings.subscribe(() => {
        expect(localStorageService.setItem).toHaveBeenCalledWith(
          SETTINGS_KEY,
          settings
        );
      });
    });
  });
});

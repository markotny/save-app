import {Injectable} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {merge, of} from 'rxjs';
import {tap, withLatestFrom} from 'rxjs/operators';

import {actionSettingsChangeTheme} from './settings.actions';
import {selectTheme} from './settings.selectors';
import {State} from './settings.model';
import {selectSettingsState} from '@core/core.state';
import {LocalStorageService} from '@core/local-storage/local-storage.service';

export const SETTINGS_KEY = 'SETTINGS';

const INIT = of('wdtx-init-effect-trigger');

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private overlayContainer: OverlayContainer,
    private localStorageService: LocalStorageService
  ) {}

  persistSettings = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionSettingsChangeTheme),
        withLatestFrom(this.store.pipe(select(selectSettingsState))),
        tap(([, settings]) =>
          this.localStorageService.setItem(SETTINGS_KEY, settings)
        )
      ),
    {dispatch: false}
  );

  updateTheme = createEffect(
    () =>
      merge(INIT, this.actions$.pipe(ofType(actionSettingsChangeTheme))).pipe(
        withLatestFrom(this.store.pipe(select(selectTheme))),
        tap(([, theme]) => {
          const classList = this.overlayContainer.getContainerElement()
            .classList;
          const toRemove = Array.from(classList).filter((item: string) =>
            item.includes('-theme')
          );
          if (toRemove.length) {
            classList.remove(...toRemove);
          }
          classList.add(theme);
        })
      ),
    {dispatch: false}
  );
}

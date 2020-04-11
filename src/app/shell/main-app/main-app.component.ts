import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription, Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {MediaObserver} from '@angular/flex-layout';
import {selectTheme} from '@core/core.module';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit, OnDestroy {
  private watcher: Subscription;

  isMobile = false;

  sidebarVisible: boolean;

  constructor(private store: Store, mediaObserver: MediaObserver) {
    // tslint:disable-next-line: deprecation
    this.watcher = mediaObserver.media$.subscribe(change => {
      this.isMobile = change.mqAlias === 'xs';
      if (!this.isMobile) {
        this.sidebarVisible = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }
}

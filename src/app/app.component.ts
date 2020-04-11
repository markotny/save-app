import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {selectTheme} from '@core/core.module';
import {MediaObserver} from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private watcher: Subscription;

  isMobile = false;
  theme$: Observable<string>;

  sidebarVisible: boolean;

  constructor(private store: Store, mediaObserver: MediaObserver) {
    this.watcher = mediaObserver.media$.subscribe(change => {
      this.isMobile = change.mqAlias === 'xs';
      if (!this.isMobile) {
        this.sidebarVisible = true;
      }
    });
  }

  ngOnInit(): void {
    this.theme$ = this.store.pipe(select(selectTheme));
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }
}

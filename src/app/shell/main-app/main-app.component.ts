import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {getHeaderStyle} from '@shell/header-style.model';
import {MediaObserver, MediaChange} from '@angular/flex-layout';
import {Subscription} from 'rxjs';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit, OnDestroy {
  sidebarVisible: boolean;
  watcher$: Subscription;
  rowStyle: unknown;

  constructor(private mediaObserver: MediaObserver, @Inject(DOCUMENT) private document) {}
  ngOnInit() {
    this.initWatcher();
    this.injectBackgroundColor();
  }

  private initWatcher(): void {
    this.watcher$ = this.mediaObserver.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias !== 'xs') {
        this.rowStyle = getHeaderStyle('rows-big');
      } else {
        this.rowStyle = getHeaderStyle('rows-small');
      }
    });
  }

  private injectBackgroundColor() {
    this.document.body.classList.add('background-app');
  }

  ngOnDestroy(): void {
    this.watcher$.unsubscribe();
    this.document.body.classList.remove('background-app');
  }
}

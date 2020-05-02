import {DOCUMENT} from '@angular/common';
import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {mainContentAnimations, sidebarAnimations, SidebarState, headerAnimations, overlayAnimations} from '@shell/shell.animations';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map, tap, pluck} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-main-app',
  animations: [sidebarAnimations, mainContentAnimations, headerAnimations, overlayAnimations],
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit, OnDestroy {
  sidebarVisible$ = new BehaviorSubject<boolean>(false);
  sidebarState$: Observable<SidebarState>;

  sidebarStateEnum = SidebarState;

  constructor(@Inject(DOCUMENT) private document, public breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.injectBackgroundColor();

    const isSmall$ = this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
      pluck('matches'),
      tap(matches => (matches ? this.sidebarVisible$.next(false) : null))
    );

    this.sidebarState$ = combineLatest([isSmall$, this.sidebarVisible$]).pipe(
      map(([isSmall, sidebarVisible]) => (isSmall ? (sidebarVisible ? SidebarState.Over : SidebarState.Hidden) : SidebarState.Docked))
    );
  }

  toggleSidebar() {
    const current = this.sidebarVisible$.getValue();
    this.sidebarVisible$.next(!current);
  }

  private injectBackgroundColor() {
    this.document.body.classList.add('background-app');
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('background-app');
  }
}

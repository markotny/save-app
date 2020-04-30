import {DOCUMENT} from '@angular/common';
import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {mainContentAnimations, sidebarAnimations, SidebarState, fadeAnimation, headerAnimations} from '@shell/shell.animations';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-main-app',
  animations: [sidebarAnimations, mainContentAnimations, headerAnimations, fadeAnimation],
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

    const breakpoint$ = this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .pipe(tap(breakpoint => (!breakpoint.matches ? this.sidebarVisible$.next(false) : null)));

    this.sidebarState$ = combineLatest([breakpoint$, this.sidebarVisible$]).pipe(
      map(([breakpoint, sidebarVisible]) =>
        breakpoint.matches ? (sidebarVisible ? SidebarState.Over : SidebarState.Hidden) : SidebarState.Docked
      )
    );
  }

  toggleSidebar() {
    const current = this.sidebarVisible$.getValue();
    this.sidebarVisible$.next(!current);
  }

  isSmall(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.XSmall);
  }

  private injectBackgroundColor() {
    this.document.body.classList.add('background-app');
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('background-app');
  }
}

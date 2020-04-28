import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {trigger, state, style, transition, animate, group, query, animateChild} from '@angular/animations';
import {MediaObserver} from '@angular/flex-layout';

@Component({
  selector: 'app-main-app',
  animations: [
    trigger('sidenavHideXs', [
      state(
        'true',
        style({
          transform: 'translateX(-100%)',
          flex: '0 1 0'
        })
      ),
      state(
        'false',
        style({
          transform: 'translateX(0)',
          flex: '1 0 250px'
        })
      ),
      transition('false => true', [animate('0.5s ease-in')]),
      transition('true => false', [animate('0.5s ease-out')])
    ]),
    trigger('sidenavMargin', [
      state(
        'true',
        style({
          marginLeft: 0
        })
      ),
      state(
        'false',
        style({
          marginLeft: '250px'
        })
      ),
      transition('false => true', [group([query('@headerHeight', animateChild()), animate('0.5s ease-in')])]),
      transition('true => false', [group([query('@headerHeight', animateChild()), animate('0.5s ease-out')])])
    ]),
    trigger('headerHeight', [
      state(
        'true',
        style({
          height: '50px'
        })
      ),
      state(
        'false',
        style({
          height: '86px'
        })
      ),
      transition('false => true', [group([query('@headerFade', animateChild()), animate('0.2s ease-in')])]),
      transition('true => false', [group([query('@headerFade', animateChild()), animate('0.2s 0.3s ease-out')])])
    ])
  ],
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit, OnDestroy {
  sidebarVisible: boolean;
  rowStyle: unknown;

  constructor(@Inject(DOCUMENT) private document, public mediaObserver: MediaObserver) {}
  ngOnInit() {
    this.injectBackgroundColor();
  }

  private injectBackgroundColor() {
    this.document.body.classList.add('background-app');
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('background-app');
  }
}

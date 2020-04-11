import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-welcome-app',
  templateUrl: './welcome-app.component.html',
  styleUrls: ['./welcome-app.component.scss']
})
export class WelcomeAppComponent implements OnInit, OnDestroy {
  constructor(@Inject(DOCUMENT) private document) {}

  ngOnInit(): void {
    this.document.body.classList.add('background-light');
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('background-light');
  }
}

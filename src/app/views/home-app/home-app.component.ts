import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-home-app',
  templateUrl: './home-app.component.html',
  styleUrls: ['./home-app.component.scss']
})
export class HomeAppComponent implements OnInit, OnDestroy {
  constructor(@Inject(DOCUMENT) private document) {}

  ngOnInit(): void {
    this.document.body.classList.add('background-light');
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('background-light');
  }
}

import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription, Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {MediaObserver} from '@angular/flex-layout';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit {
  isMobile: boolean;

  sidebarVisible: boolean;

  constructor(private store: Store) {}
  ngOnInit() {
    this.isMobile = false;
  }
}

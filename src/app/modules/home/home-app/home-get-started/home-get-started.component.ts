import {Component} from '@angular/core';

import {Store} from '@ngrx/store';

import {actionOidcRegister} from '@core/index';

@Component({
  selector: 'app-home-get-started',
  templateUrl: './home-get-started.component.html',
  styleUrls: ['./home-get-started.component.scss']
})
export class HomeGetStartedComponent {
  constructor(private store: Store) {}

  register() {
    this.store.dispatch(actionOidcRegister());
  }
}

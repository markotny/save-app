import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {actionOidcLogin} from '@core/core.module';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent {
  constructor(private store: Store) {}

  isOpen = false;

  signin() {
    this.store.dispatch(actionOidcLogin());
  }
}

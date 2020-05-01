import {Component} from '@angular/core';
import {AuthService} from '@core/auth/auth.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent {
  constructor(private auth: AuthService) {}

  isOpen = false;

  signin() {
    this.auth.login();
  }
}

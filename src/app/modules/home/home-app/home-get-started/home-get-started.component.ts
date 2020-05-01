import {Component} from '@angular/core';
import {AuthService} from '@core/auth/auth.service';

@Component({
  selector: 'app-home-get-started',
  templateUrl: './home-get-started.component.html',
  styleUrls: ['./home-get-started.component.scss']
})
export class HomeGetStartedComponent {
  constructor(private auth: AuthService) {}

  register() {
    this.auth.register();
  }
}

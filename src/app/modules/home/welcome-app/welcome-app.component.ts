import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {OidcFacade} from 'ng-oidc-client';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {actionOidcRegister} from '@core/core.module';

@Component({
  selector: 'app-welcome-app',
  templateUrl: './welcome-app.component.html',
  styleUrls: ['./welcome-app.component.scss']
})
export class WelcomeAppComponent implements OnInit {
  constructor(private store: Store, private oidcFacade: OidcFacade, private router: Router) {}

  ngOnInit(): void {
    this.oidcFacade.loggedIn$.pipe(first()).subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['app']);
      }
    });
  }

  register() {
    this.store.dispatch(actionOidcRegister());
  }

  signin() {
    this.oidcFacade.signinRedirect();
  }
}

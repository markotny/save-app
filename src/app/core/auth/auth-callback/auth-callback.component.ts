import {Component, OnInit} from '@angular/core';
import {AuthCallback} from './auth-callback.enum';
import {OidcFacade} from 'ng-oidc-client';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  template: ``,
  styles: []
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private oidcFacade: OidcFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(async data => {
      switch (data.action) {
        case AuthCallback.Login:
          console.log('login redirect:', data.redirectUrl);
          this.oidcFacade
            .getUserManager()
            .signinRedirectCallback()
            .then(() => this.router.navigate(['/']));
          break;
        case AuthCallback.Register:
          console.log('strzał do resource API /api/v1/User/register');
          break;
        case AuthCallback.SilentRefresh:
          this.oidcFacade.getUserManager().signinSilentCallback();
          break;
      }
    });
  }
}

import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {OidcFacade} from 'ng-oidc-client';
import {switchMap, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private oidcFacade: OidcFacade) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.oidcFacade.waitForAuthenticationLoaded().pipe(
      switchMap(() =>
        this.oidcFacade.identity$.pipe(
          first(),
          switchMap(user => {
            if (user && !user.expired) {
              return of(true);
            } else {
              this.oidcFacade.signinRedirect({
                data: {
                  redirectUrl: next.url
                }
              });
              return of(false);
            }
          })
        )
      )
    );
  }
}

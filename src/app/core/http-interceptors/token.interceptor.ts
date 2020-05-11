import {Injectable} from '@angular/core';
import {OidcFacade} from 'ng-oidc-client';
import {Observable} from 'rxjs';
import {switchMap, first} from 'rxjs/operators';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private oidcFacade: OidcFacade) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.oidcFacade.identity$.pipe(
      first(),
      switchMap(user => {
        if (user && user.access_token) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${user.access_token}`
            }
          });
        }
        return next.handle(req);
      })
    );
  }
}

import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

/** Converts date values to JS date */
@Injectable()
export class DateConverterInterceptor implements HttpInterceptor {
  private iso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(tap((event: HttpEvent<unknown>) => event instanceof HttpResponse && this.convertDates(event.body)));
  }

  private convertDates(object: unknown) {
    if (!object || !(object instanceof Object)) {
      return;
    }

    if (Array.isArray(object)) {
      object.forEach(o => this.convertDates(o));
    }

    Object.entries(object).forEach(([key, val]) => {
      if (Array.isArray(val)) {
        val.forEach(o => this.convertDates(o));
      }
      if (val instanceof Object) {
        this.convertDates(val);
      }
      if (typeof val === 'string' && this.iso8601.test(val)) {
        object[key] = new Date(val);
      }
    });
  }
}

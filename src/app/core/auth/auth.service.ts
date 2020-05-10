import {environment} from '@env/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private apiPath = `${environment.apiServerUri}/User`;

  register() {
    const returnUrl = `${environment.thisUri}/register-callback`;
    window.location.href = `${environment.authServerUri}/Identity/Account/Register?ReturnUrl=${returnUrl}`;
  }

  ensureRegistered() {
    return this.http.post(`${this.apiPath}/ensureRegister`, {}, {responseType: 'text'});
  }
}

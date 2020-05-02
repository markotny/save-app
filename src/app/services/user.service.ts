import {environment} from '@env/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}
  private apiPath = `${environment.apiServerUri}/User`;

  addNewUser() {
    return this.http.post(`${this.apiPath}/register`, {});
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {Budget} from '@wydatex/models';

@Injectable()
export class BudgetService {
  private apiPath = `${environment.apiServerUri}/Budget`;

  constructor(private http: HttpClient) {}

  getList(): Observable<Budget[]> {
    return this.http.get<Budget[]>(this.apiPath);
  }

  add(budget: Budget) {
    return this.http.post<Budget>(this.apiPath, budget);
  }

  edit(budget: Budget) {
    return this.http.put<Budget>(this.apiPath, budget);
  }

  remove(id: number) {
    return this.http.delete(`${this.apiPath}/${id}`);
  }
}

import {environment} from '@env/environment';
import {HttpClient} from '@angular/common/http';
import {Id} from '@shared/types';
import {ModelBase} from '@wydatex/models';
import {ApiModule} from './api-module.enum';
import {map} from 'rxjs/operators';

export abstract class CrudService<DTO, VM extends ModelBase> {
  protected apiPath: string;

  constructor(protected http: HttpClient, public module: ApiModule) {
    this.apiPath = `${environment.apiServerUri}/${ApiModule[module]}`;
  }

  getList() {
    return this.http.get<VM[]>(this.apiPath).pipe(map(list => list || []));
  }

  get(id: Id<VM>) {
    return this.http.get<VM>(`${this.apiPath}/${id}`);
  }

  add(item: DTO) {
    return this.http.post<VM>(this.apiPath, item);
  }

  edit(id: Id<VM>, item: DTO) {
    return this.http.put<VM>(`${this.apiPath}/${id}`, item);
  }

  remove(id: Id<VM>) {
    return this.http.delete(`${this.apiPath}/${id}`);
  }
}

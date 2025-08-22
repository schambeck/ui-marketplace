import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Page} from '../model/page';
import {User} from "../model/user.entity"
import {CustomAutoCompleteService} from "./custom-auto-complete.service";
import {HttpUtil} from "../util/http.util";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '69420'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService implements CustomAutoCompleteService<User> {
  private url = `${environment.baseUrl}/users`;

  constructor(private http: HttpClient, private httpUtil: HttpUtil) {
  }

  create(user: User): Observable<User> {
    const url = `${this.url}`;
    return this.http.post<User>(url, user, httpOptions)
  }

  update(id: number | string, user: User): Observable<User> {
    const url = `${this.url}/${encodeURIComponent(id)}`;
    return this.http.put<User>(url, user, httpOptions)
  }

  list(page = 0, size = 5, search = ""): Observable<Page<User>> {
    let params = new HttpParams().set('page', page).set('size', size).set("search", search);
    return this.http.get<Page<User>>(this.url, { params: params, headers: this.httpUtil.getHeaders() });
  }

  get(id: string): Observable<User> {
    const url = `${this.url}/${encodeURIComponent(id)}`;
    return this.http.get<User>(url, {headers: this.httpUtil.getHeaders()});
  }

  delete(id: string): Observable<void> {
    const url = `${this.url}/${encodeURIComponent(id)}`;
    return this.http.delete<void>(url, {headers: this.httpUtil.getHeaders()});
  }

  findLoggedUser(): Observable<User> {
    let url = `${this.url}/queries/find-logged-user`;
    return this.http.get<User>(url);
  }
}

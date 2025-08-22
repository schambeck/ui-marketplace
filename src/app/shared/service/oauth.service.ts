import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OAuthService {
  private url = `${environment.baseUrl}/oauth`;

  constructor(private http: HttpClient) {
  }

  startFlow(): Observable<any> {
    const url = `${this.url}/start-flow`;
    return this.http.get<any>(url);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OAuthTokenService {
  private url = `${environment.baseUrl}/oauth-tokens`;

  constructor(private http: HttpClient) {
  }

  getByUser(userId: number): Observable<any> {
    const url = `${this.url}/user/${userId}`;
    return this.http.get<any>(url);
  }
}

export class OauthTokenService {
}

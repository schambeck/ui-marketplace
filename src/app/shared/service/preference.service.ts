import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Preference} from "../model/preference.entity";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  private url = `${environment.baseUrl}/mercado-pago/preferences`;

  constructor(private http: HttpClient) {
  }

  create(): Observable<Preference> {
    return this.http.post<Preference>(this.url, {}, httpOptions)
  }
}

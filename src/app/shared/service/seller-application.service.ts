import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {SellerApplication, SellerApplicationRequest} from '../model/seller-application.model';
import {Page} from '../model/page';

const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({providedIn: 'root'})
export class SellerApplicationService {
  private readonly url = `${(environment as {baseUrl: string}).baseUrl}/seller-applications`;
  constructor(private http: HttpClient) {}

  mine(): Observable<SellerApplication | null> { return this.http.get<SellerApplication | null>(`${this.url}/mine`); }
  submit(request: SellerApplicationRequest): Observable<SellerApplication> { return this.http.post<SellerApplication>(this.url, request, options); }
  pending(page = 0, size = 25): Observable<Page<SellerApplication>> { return this.http.get<Page<SellerApplication>>(`${this.url}?page=${page}&size=${size}`); }
  decide(id: number, approve: boolean, reason: string): Observable<SellerApplication> {
    return this.http.post<SellerApplication>(`${this.url}/${encodeURIComponent(id)}/${approve ? 'approve' : 'reject'}`, {reason}, options);
  }
}

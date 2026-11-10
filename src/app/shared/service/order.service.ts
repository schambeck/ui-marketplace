import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Order} from '../model/order.entity';
import {Page} from '../model/page';
import {Preference} from '../model/preference.entity';

@Injectable({providedIn: 'root'})
export class OrderService {
  private readonly url = `${(environment as {baseUrl: string}).baseUrl}/orders`;
  constructor(private http: HttpClient) {}

  checkout(idempotencyKey: string, instructions?: string): Observable<Order> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey});
    return this.http.post<Order>(`${this.url}/checkout`, {instructions: instructions || null}, {headers});
  }
  get(publicId: string): Observable<Order> { return this.http.get<Order>(`${this.url}/${publicId}`); }
  list(page = 0, size = 20): Observable<Page<Order>> { return this.http.get<Page<Order>>(`${this.url}?page=${page}&size=${size}`); }
  createPreference(publicId: string, idempotencyKey: string): Observable<Preference> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey});
    return this.http.post<Preference>(`${(environment as {baseUrl: string}).baseUrl}/mercado-pago/preferences/orders/${encodeURIComponent(publicId)}`, {}, {headers});
  }
}

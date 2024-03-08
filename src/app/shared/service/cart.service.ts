import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Page} from '../model/page';
import {Cart} from "../model/cart.entity"
import {CustomAutoCompleteService} from "./custom-auto-complete.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CartService implements CustomAutoCompleteService<Cart> {

  private url = `${environment.baseUrl}/carts`;

  constructor(private http: HttpClient) {
  }

  create(cart: Cart): Observable<Cart> {
    const url = `${this.url}`;
    return this.http.post<Cart>(url, cart, httpOptions)
  }

  update(id: number | string, cart: Cart): Observable<Cart> {
    const url = `${this.url}/${encodeURIComponent(id)}`;
    return this.http.put<Cart>(url, cart, httpOptions)
  }

  list(page = 0, size = 5, search = ""): Observable<Page<Cart>> {
    let params = new HttpParams().set('page', page).set('size', size).set("search", search);
    return this.http.get<Page<Cart>>(this.url, { params: params });
  }

  get(id: number | string): Observable<Cart> {
    const url = `${this.url}/${encodeURIComponent(id)}`;
    return this.http.get<Cart>(url);
  }

  getByUser(): Observable<Cart> {
    const url = `${this.url}/user`;
    return this.http.get<Cart>(url);
  }

  delete(id: string): Observable<void> {
    const url = `${this.url}/${encodeURIComponent(id)}`;
    return this.http.delete<void>(url);
  }

}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Page} from '../model/page';
import {CartItem} from "../model/cart-item.entity"
import {CustomAutoCompleteService} from "./custom-auto-complete.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CartItemService implements CustomAutoCompleteService<CartItem> {

  private url = `${environment.baseUrl}/cart-items`;

  constructor(private http: HttpClient, private httpUtil: HttpUtil) {
  }

  create(cartItem: CartItem): Observable<CartItem> {
    const url = `${this.url}`;
    return this.http.post<CartItem>(url, cartItem, httpOptions)
  }

  update(id: number | string, cartItem: CartItem): Observable<CartItem> {
    const url = `${this.url}/${encodeURIComponent(id)}`;
    return this.http.put<CartItem>(url, cartItem, httpOptions)
  }

  list(page = 0, size = 5, search = ""): Observable<Page<CartItem>> {
    let params = new HttpParams().set('page', page).set('size', size).set("search", search);
    return this.http.get<Page<CartItem>>(this.url, { params: params });
  }

  get(id: string): Observable<CartItem> {
    const url = `${this.url}/${encodeURIComponent(id)}`;
    return this.http.get<CartItem>(url);
  }

  delete(id: string): Observable<void> {
    const url = `${this.url}/${encodeURIComponent(id)}`;
    return this.http.delete<void>(url);
  }

}

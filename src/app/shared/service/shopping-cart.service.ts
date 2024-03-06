import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Page} from '../model/page';
import {CartItem} from "../model/cart-item.entity"
import {CustomAutoCompleteService} from "./custom-auto-complete.service";
import {CreateShoppingCartItemRequest} from "../model/create-shopping-cart-item.request";
import {UpdateShoppingCartItemRequest} from "../model/update-shopping-cart-item.request";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService implements CustomAutoCompleteService<CartItem> {

  private url = `${environment.baseUrl}/shopping-cart`;

  constructor(private http: HttpClient) {
  }

  create(request: CreateShoppingCartItemRequest): Observable<CartItem> {
    const url = `${this.url}`;
    return this.http.post<CartItem>(url, request, httpOptions)
  }

  update(id: number | string, request: UpdateShoppingCartItemRequest): Observable<CartItem> {
    const url = `${this.url}/${encodeURIComponent(id)}`;
    return this.http.put<CartItem>(url, request, httpOptions)
  }

  list(page = 0, size = 5, search = ""): Observable<Page<CartItem>> {
    let params = new HttpParams().set('page', page).set('size', size).set("search", search);
    return this.http.get<Page<CartItem>>(this.url, { params: params });
  }

  search(cartId: number, page = 0, size = 5, search = ""): Observable<Page<CartItem>> {
    let params = new HttpParams().set('page', page).set('size', size).set("search", search);
    const url = `${this.url}/${encodeURIComponent(cartId)}`;
    return this.http.get<Page<CartItem>>(url, { params: params });
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

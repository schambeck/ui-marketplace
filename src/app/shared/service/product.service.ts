import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Page} from '../model/page';
import {Product} from "../model/product.entity"
import {CustomAutoCompleteService} from "./custom-auto-complete.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductService implements CustomAutoCompleteService<Product> {

  private url = `${environment.baseUrl}/products`;

  constructor(private http: HttpClient) {
  }

  create(product: Product): Observable<Product> {
    const url = `${this.url}`;
    return this.http.post<Product>(url, product, httpOptions)
  }

  update(id: number | string, product: Product): Observable<Product> {
    const url = `${this.url}/${encodeURIComponent(id)}`;
    return this.http.put<Product>(url, product, httpOptions)
  }

  list(page = 0, size = 5, search = ""): Observable<Page<Product>> {
    let params = new HttpParams().set('page', page).set('size', size).set("search", search);
    return this.http.get<Page<Product>>(this.url, { params: params });
  }

  get(id: string): Observable<Product> {
    const url = `${this.url}/${encodeURIComponent(id)}`;
    return this.http.get<Product>(url);
  }

  delete(id: string): Observable<void> {
    const url = `${this.url}/${encodeURIComponent(id)}`;
    return this.http.delete<void>(url);
  }

  listByUser(page = 0, size = 5, search = ""): Observable<Page<Product>> {
    let params = new HttpParams().set('page', page).set('size', size).set("search", search);
    let url = `${this.url}/user`;
    return this.http.get<Page<Product>>(url, { params: params });
  }

  getImage(objectId: string): string {
    return `${this.url}/download/${encodeURIComponent(objectId)}`;
  }

}

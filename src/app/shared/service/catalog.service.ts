import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Page} from '../model/page';
import {Product} from "../model/product.entity"
import {CustomAutoCompleteService} from "./custom-auto-complete.service";
import {HttpUtil} from "../util/http.util";

@Injectable({
  providedIn: 'root'
})
export class CatalogService implements CustomAutoCompleteService<Product> {
  private url = `${environment.baseUrl}/catalog`;

  constructor(private http: HttpClient, private httpUtil: HttpUtil) {
  }

  list(page = 0, size = 5, search = ""): Observable<Page<Product>> {
    let params = new HttpParams().set('page', page).set('size', size).set("search", search);
    return this.http.get<Page<Product>>(this.url, { params: params, headers: this.httpUtil.getHeaders() });
  }

  get(id: string): Observable<Product> {
    const url = `${this.url}/${encodeURIComponent(id)}`;
    return this.http.get<Product>(url, { headers: this.httpUtil.getHeaders() });
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Page} from '../model/page';
import {Image} from "../model/image.entity"
import {CustomAutoCompleteService} from "./custom-auto-complete.service";
import {HttpUtil} from "../util/http.util";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ImageService implements CustomAutoCompleteService<Image> {
  private url = `${environment.baseUrl}/images`;

  constructor(private http: HttpClient, private httpUtil: HttpUtil) {
  }

  create(image: Image): Observable<Image> {
    const url = `${this.url}`;
    return this.http.post<Image>(url, image, httpOptions)
  }

  update(id: number | string, image: Image): Observable<Image> {
    const url = `${this.url}/${encodeURIComponent(id)}`;
    return this.http.put<Image>(url, image, httpOptions)
  }

  list(page = 0, size = 5, search = ""): Observable<Page<Image>> {
    let params = new HttpParams().set('page', page).set('size', size).set("search", search);
    return this.http.get<Page<Image>>(this.url, { params: params, headers: this.httpUtil.getHeaders() });
  }

  listByProduct(productId: number): Observable<Image[]> {
    let url = `${this.url}/${productId}/product`;
    return this.http.get<Image[]>(url);
  }

  get(id: string): Observable<Image> {
    const url = `${this.url}/${encodeURIComponent(id)}`;
    return this.http.get<Image>(url);
  }

  delete(id: string): Observable<void> {
    const url = `${this.url}/${encodeURIComponent(id)}`;
    return this.http.delete<void>(url);
  }
}

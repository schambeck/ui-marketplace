import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {forkJoin, map, Observable, switchMap} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Page} from '../model/page';
import {Offer} from '../model/offer.entity';
import {ProductService} from './product.service';
import {HttpUtil} from "../util/http.util";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private url = `${(environment as {baseUrl: string}).baseUrl}/catalog`;

  constructor(private http: HttpClient, private httpUtil: HttpUtil, private productService: ProductService) {
  }

  list(page = 0, size = 5, search = ''): Observable<Page<Offer>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('search', search);
    return this.http.get<Page<Offer>>(`${this.url}/offers`, {params, headers: this.httpUtil.getHeaders()}).pipe(
      switchMap(result => forkJoin(result.content.map(offer => this.hydrateProduct(offer))).pipe(
        map(content => ({...result, content}))
      ))
    );
  }

  get(id: string): Observable<Offer> {
    return this.http.get<Offer>(`${this.url}/offers/${encodeURIComponent(id)}`, {headers: this.httpUtil.getHeaders()})
      .pipe(switchMap(offer => this.hydrateProduct(offer)));
  }

  private hydrateProduct(offer: Offer): Observable<Offer> {
    return this.productService.get(String(offer.productId)).pipe(map(product => ({...offer, product})));
  }

}

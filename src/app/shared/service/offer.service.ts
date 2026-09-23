import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Offer} from '../model/offer.entity';
import {OfferActionRequest} from '../model/offer-action.request';
import {OfferAvailabilityRequest} from '../model/offer-availability.request';
import {OfferStatusHistory} from '../model/offer-status-history.entity';
import {OfferUpdateRequest} from '../model/offer-update.request';
import {Page} from '../model/page';
import {HttpUtil} from '../util/http.util';

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({providedIn: 'root'})
export class OfferService {
  private url = `${(environment as {baseUrl: string}).baseUrl}/offers`;

  constructor(private http: HttpClient, private httpUtil: HttpUtil) {}

  searchPublished(page = 0, size = 5, search = ''): Observable<Page<Offer>> {
    const params = new HttpParams().set('page', page).set('size', size).set('search', search);
    return this.http.get<Page<Offer>>(this.url, {params, headers: this.httpUtil.getHeaders()});
  }

  getPublished(id: number | string): Observable<Offer> {
    return this.http.get<Offer>(`${this.url}/${encodeURIComponent(id)}`, {headers: this.httpUtil.getHeaders()});
  }

  searchAdmin(page = 0, size = 25, status = '', search = ''): Observable<Page<Offer>> {
    let params = new HttpParams().set('page', page).set('size', size).set('search', search);
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<Page<Offer>>(`${(environment as {baseUrl: string}).baseUrl}/admin/offers`, {params, headers: this.httpUtil.getHeaders()});
  }

  getAdmin(id: number | string): Observable<Offer> {
    return this.http.get<Offer>(`${(environment as {baseUrl: string}).baseUrl}/admin/offers/${encodeURIComponent(id)}`, {headers: this.httpUtil.getHeaders()});
  }

  create(request: OfferUpdateRequest): Observable<Offer> { return this.http.post<Offer>(this.url, request, httpOptions); }

  updateDraft(id: number | string, request: OfferUpdateRequest): Observable<Offer> {
    return this.http.put<Offer>(`${this.url}/${encodeURIComponent(id)}`, request, httpOptions);
  }

  history(id: number | string): Observable<OfferStatusHistory[]> {
    return this.http.get<OfferStatusHistory[]>(`${this.url}/${encodeURIComponent(id)}/history`, {headers: this.httpUtil.getHeaders()});
  }

  publish(id: number | string, request: OfferActionRequest): Observable<Offer> { return this.action(id, 'publish', request); }
  pause(id: number | string, request: OfferActionRequest): Observable<Offer> { return this.action(id, 'pause', request); }
  reactivate(id: number | string, request: OfferActionRequest): Observable<Offer> { return this.action(id, 'reactivate', request); }
  retire(id: number | string, request: OfferActionRequest): Observable<Offer> { return this.action(id, 'retire', request); }

  changeAvailability(id: number | string, request: OfferAvailabilityRequest): Observable<Offer> {
    return this.http.post<Offer>(`${this.url}/${encodeURIComponent(id)}/availability`, request, httpOptions);
  }

  private action(id: number | string, action: string, request: OfferActionRequest): Observable<Offer> {
    return this.http.post<Offer>(`${this.url}/${encodeURIComponent(id)}/${action}`, request, httpOptions);
  }
}

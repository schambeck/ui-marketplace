import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Payment} from "../model/payment.entity";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private url = `${environment.baseUrl}/mercado-pago/payments`;

  constructor(private http: HttpClient) {
  }

  create(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.url, payment, httpOptions)
  }
}

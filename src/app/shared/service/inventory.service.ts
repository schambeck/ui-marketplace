import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {InventoryAllocation, InventoryOrder, InventoryReservation} from '../model/inventory.entity';

@Injectable({providedIn: 'root'})
export class InventoryService {
  private readonly url = `${environment.baseUrl}/inventory`;
  constructor(private http: HttpClient) {}

  getOrder(orderId: string): Observable<InventoryOrder> {
    return this.http.get<InventoryOrder>(`${this.url}/orders/${orderId}`);
  }

  allocate(reservationId: number, quantity: number, operationKey: string): Observable<InventoryAllocation> {
    return this.http.post<InventoryAllocation>(`${this.url}/reservations/${reservationId}/allocate`, {quantity, operationKey});
  }

  release(reservationId: number, operationKey: string): Observable<InventoryReservation> {
    return this.http.post<InventoryReservation>(`${this.url}/reservations/${reservationId}/release`, null, {params: {operationKey}});
  }

  expire(reservationId: number, operationKey: string): Observable<InventoryReservation> {
    return this.http.post<InventoryReservation>(`${this.url}/reservations/${reservationId}/expire`, null, {params: {operationKey}});
  }

  consumeAllocation(allocationId: number, quantity: number, operationKey: string): Observable<InventoryAllocation> {
    return this.http.post<InventoryAllocation>(`${this.url}/allocations/${allocationId}/consume`, {quantity, operationKey});
  }
}

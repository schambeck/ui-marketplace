import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {environment} from '../../../environments/environment';
import {OrderService} from './order.service';

describe('OrderService', () => {
  let service: OrderService;
  let http: HttpTestingController;
  const baseUrl = `${(environment as {baseUrl: string}).baseUrl}/orders`;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(OrderService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('lists the authenticated user orders with pagination', () => {
    service.list(2, 20).subscribe(page => expect(page.totalElements).toBe(1));

    const request = http.expectOne(`${baseUrl}?page=2&size=20`);
    expect(request.request.method).toBe('GET');
    request.flush({content: [{publicId: 'order-1', status: 'CREATED', subtotalAmount: 10, totalAmount: 10}], size: 20, totalElements: 1});
  });
});

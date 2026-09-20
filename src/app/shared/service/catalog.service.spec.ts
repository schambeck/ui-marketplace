import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {environment} from '../../../environments/environment';
import {Offer} from '../model/offer.entity';
import {Product} from '../model/product.entity';
import {CatalogService} from './catalog.service';

describe('CatalogService', () => {
  let service: CatalogService;
  let http: HttpTestingController;
  const apiBaseUrl = (environment as {baseUrl: string}).baseUrl;
  const product = {id: 7, name: 'Product'} as Product;
  const offer = {
    id: 11,
    productId: product.id,
    contextVersion: 2,
    context: {id: 3, version: 2, game: 'Elden Ring', platform: 'PC'},
    price: 25,
    deliveryMethod: 'digital',
    availabilitySource: 'manual',
    availabilityStatus: 'AVAILABLE',
    status: 'PUBLISHED',
    version: 1,
    createdAt: '',
    modifiedAt: ''
  } as Offer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CatalogService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('loads published offers and hydrates their products', () => {
    service.list(0, 5, 'Elden').subscribe(result => {
      expect(result.content[0].id).toBe(offer.id);
      expect(result.content[0].product).toBe(product);
    });

    const request = http.expectOne(request => request.url === `${apiBaseUrl}/catalog/offers`);
    expect(request.request.params.get('search')).toBe('Elden');
    request.flush({content: [offer], size: 5, totalElements: 1});

    const productRequest = http.expectOne(`${apiBaseUrl}/catalog/${product.id}`);
    expect(productRequest.request.method).toBe('GET');
    productRequest.flush(product);
  });

  it('loads an offer by encoded offer id', () => {
    service.get('offer/11').subscribe(result => expect(result.product).toBe(product));

    const request = http.expectOne(`${apiBaseUrl}/catalog/offers/offer%2F11`);
    expect(request.request.method).toBe('GET');
    request.flush(offer);

    const productRequest = http.expectOne(`${apiBaseUrl}/catalog/${product.id}`);
    expect(productRequest.request.method).toBe('GET');
    productRequest.flush(product);
  });
});

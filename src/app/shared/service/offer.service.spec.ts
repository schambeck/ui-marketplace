import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {environment} from '../../../environments/environment';
import {OfferService} from './offer.service';

describe('OfferService', () => {
  let service: OfferService;
  let http: HttpTestingController;
  const baseUrl = `${(environment as {baseUrl: string}).baseUrl}/offers`;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(OfferService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('encodes offer ids for history and state actions', () => {
    service.pause('offer/11', {reason: 'maintenance', source: 'admin'}).subscribe();
    const pause = http.expectOne(`${baseUrl}/offer%2F11/pause`);
    expect(pause.request.method).toBe('POST');
    pause.flush({});

    service.history('offer/11').subscribe();
    const history = http.expectOne(`${baseUrl}/offer%2F11/history`);
    expect(history.request.method).toBe('GET');
    history.flush([]);
  });

  it("lists administrative offers with status and search filters", () => {
    service.searchAdmin(1, 25, "PAUSED", "elden ring").subscribe();
    const request = http.expectOne(req => req.url.endsWith("/admin/offers"));
    expect(request.request.method).toBe("GET");
    expect(request.request.params.get("status")).toBe("PAUSED");
    expect(request.request.params.get("search")).toBe("elden ring");
    expect(request.request.params.get("page")).toBe("1");
    expect(request.request.params.get("size")).toBe("25");
    request.flush({content: [], totalElements: 0});
  });

  it("loads an administrative offer by encoded id", () => {
    service.getAdmin("offer/11").subscribe();
    const request = http.expectOne(req => req.url.endsWith("/admin/offers/offer%2F11"));
    expect(request.request.method).toBe("GET");
    request.flush({});
  });
});

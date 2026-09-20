import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {environment} from '../../../environments/environment';
import {GameContext} from '../model/game-context.entity';
import {Page} from '../model/page';
import {GameContextService} from './game-context.service';

const apiBaseUrl = (environment as {baseUrl: string}).baseUrl;

describe('GameContextService', () => {
  let service: GameContextService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GameContextService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('lists active contexts using the public API filters', () => {
    const page: Page<GameContext> = {content: [], size: 10, totalElements: 0};

    service.list(2, 10, 'Elden Ring').subscribe(result => expect(result).toEqual(page));

    const request = http.expectOne(request => request.url === `${apiBaseUrl}/game-contexts`);
    expect(request.request.method).toBe('GET');
    expect(request.request.params.get('page')).toBe('2');
    expect(request.request.params.get('size')).toBe('10');
    expect(request.request.params.get('game')).toBe('Elden Ring');
    request.flush(page);
  });

  it('encodes context ids when loading history', () => {
    service.history('context/1').subscribe();

    const request = http.expectOne(`${apiBaseUrl}/game-contexts/context%2F1/history`);
    expect(request.request.method).toBe('GET');
    request.flush([]);
  });

  it('does not send server-managed fields when creating a context', () => {
    const context: GameContext = {
      id: 0,
      version: 0,
      game: 'Elden Ring',
      platform: 'PC',
      status: 'ACTIVE',
      createdAt: '',
      modifiedAt: ''
    };

    service.create(context).subscribe();

    const request = http.expectOne(`${apiBaseUrl}/game-contexts`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({game: 'Elden Ring', platform: 'PC', status: 'ACTIVE'});
    request.flush(context);
  });
});

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {GameContext} from '../model/game-context.entity';
import {GameContextHistory} from '../model/game-context-history.entity';
import {Page} from '../model/page';
import {HttpUtil} from '../util/http.util';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '69420'})
};

@Injectable({
  providedIn: 'root'
})
export class GameContextService {
  private readonly url = `${(environment as {baseUrl: string}).baseUrl}/game-contexts`;

  constructor(private http: HttpClient, private httpUtil: HttpUtil) {
  }

  list(page = 0, size = 5, search = ''): Observable<Page<GameContext>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('game', search);
    return this.http.get<Page<GameContext>>(this.url, {
      params,
      headers: this.httpUtil.getHeaders()
    });
  }

  get(id: number | string): Observable<GameContext> {
    const url = `${this.url}/${encodeURIComponent(id)}`;
    return this.http.get<GameContext>(url, {headers: this.httpUtil.getHeaders()});
  }

  create(context: GameContext): Observable<GameContext> {
    const {id, version, createdAt, modifiedAt, ...payload} = context;
    return this.http.post<GameContext>(this.url, payload, httpOptions);
  }

  update(id: number | string, context: GameContext): Observable<GameContext> {
    const url = `${this.url}/${encodeURIComponent(id)}`;
    return this.http.put<GameContext>(url, context, httpOptions);
  }

  history(id: number | string): Observable<GameContextHistory[]> {
    const url = `${this.url}/${encodeURIComponent(id)}/history`;
    return this.http.get<GameContextHistory[]>(url, {headers: this.httpUtil.getHeaders()});
  }
}

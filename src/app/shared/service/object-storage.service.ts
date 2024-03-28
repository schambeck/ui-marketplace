import {Injectable} from '@angular/core';

import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObjectStorageService {
  private url = `${environment.baseUrl}/object-storage`;

  getImageUrl(objectId: string): string {
    return `${this.url}/download/${encodeURIComponent(objectId)}`;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { clientId } from '../config';

@Injectable()
export class PhotoService {
  private baseUrl = 'https://api.unsplash.com';

  constructor(private http: HttpClient) { }

  getPhotosBySearchText(searchText): Observable<any> {
    const header = new HttpHeaders().set('Accept-Version', 'v1');
    let params = new HttpParams().set('query', searchText);
    params = params.append('client_id', clientId);
    params = params.append('per_page', '9');
    params = params.append('orientation', 'landscape');

    return this.http.get<any>(`${this.baseUrl}/search/photos`, {
      headers: header,
      params: params
    });
  }
}

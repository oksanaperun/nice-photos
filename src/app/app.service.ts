import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) { }

  getPhotosBySearchText(searchText): Observable<any> {
    const header = new HttpHeaders().set('Accept-Version', 'v1');
    let params = new HttpParams().set('query', searchText);
    params = params.append('client_id', environment.clientId);
    params = params.append('per_page', '9');
    params = params.append('orientation', 'landscape');

    return this.http.get<any>(`${environment.apiBase}/search/photos`, {
      headers: header,
      params: params
    });
  }
}

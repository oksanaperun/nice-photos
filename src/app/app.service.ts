import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) { }

  getItems(searchText: string, pageNumber: number): Observable<SearchResponse> {
    const header = new HttpHeaders().set('Accept-Version', 'v1');
    let params = new HttpParams().set('query', searchText);
    params = params.append('client_id', environment.clientId);
    params = params.append('page', pageNumber.toString());
    params = params.append('per_page', '9');
    params = params.append('orientation', 'landscape');

    return this.http.get<SearchResponse>(`${environment.apiBase}/search/photos`, {
      headers: header,
      params: params
    });
  }
}

export interface SearchResponse {
  total: number;
  total_pages: number;
  results: SearchResponseResult[];
}

export interface SearchResponseResult {
  id: string;
  color: string;
  urls: SearchResponseResultUrls;
}

export interface SearchResponseResultUrls {
  small: string;
  regular: string;
}

export interface Item {
  id: string;
  color: string;
  smallUrl: string;
}

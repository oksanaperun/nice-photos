import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) { }

  searchItemsBySearchText(searchText): Observable<SearchResponse> {
    const header = new HttpHeaders().set('Accept-Version', 'v1');
    let params = new HttpParams().set('query', searchText);
    params = params.append('client_id', environment.clientId);
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
  results: SearchResponseResult[];
}

export interface SearchResponseResult {
  id: string;
  urls: SearchResponseResultUrls;
}

export interface SearchResponseResultUrls {
  small: string;
  regular: string;
}

export interface SearchResultsData {
  totalCount: number;
  items: Item[];
}

export interface Item {
  id: string;
  smallUrl: string;
}

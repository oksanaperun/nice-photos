import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppService, SearchResponse, SearchResponseResult } from '../../app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SearchComponent {
  searchResultsData: SearchResultsData;
  isSearchStarted: boolean;
  isSearchFinished: boolean;
  isError: boolean;

  constructor(private appService: AppService) { }

  searchPhotos(searchText) {
    this.setValuesOnSearchStart();

    this.appService.searchPhotosBySearchText(searchText)
      .subscribe(
        response => this.handleResponseOnSuccess(response),
        error => this.handleResponseOnError()
      );
  }

  setValuesOnSearchStart() {
    this.isSearchStarted = true;
    this.isSearchFinished = false;
    this.isError = false;
  }

  setValuesOnSearchFinish() {
    this.isSearchStarted = false;
    this.isSearchFinished = true;
  }

  handleResponseOnSuccess(response) {
    this.setValuesOnSearchFinish();
    this.searchResultsData = this.transformSearchResponse(response);
  }

  handleResponseOnError() {
    this.setValuesOnSearchFinish();
    this.isError = true;
  }

  transformSearchResponse(response: SearchResponse): SearchResultsData {
    return {
      totalCount: response.total,
      items: this.transformSearchResponseResults(response.results)
    };
  }

  transformSearchResponseResults(results: SearchResponseResult[]): Photo[] {
    return results.map(result => {
      return {
        id: result.id,
        smallUrl: result.urls.small
      }
    });
  }
}

export interface SearchResultsData {
  totalCount: number;
  items: Photo[];
}

export interface Photo {
  id: string;
  smallUrl: string;
}

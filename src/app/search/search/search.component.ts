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
  isErrorCaught: boolean;

  constructor(private appService: AppService) { }

  searchPhotos(searchText) {
    this.setStartSearchValues();

    this.appService.searchPhotosBySearchText(searchText)
      .subscribe(
        response => this.handleResponseOnSuccess(response),
        error => this.handleResponseOnError()
      );
  }

  setStartSearchValues() {
    this.isSearchStarted = true;
    this.isSearchFinished = false;
    this.isErrorCaught = false;
  }

  handleResponseOnSuccess(response) {
    this.isSearchStarted = false;
    this.isSearchFinished = true;
    this.searchResultsData = this.transformSearchResponse(response);
  }

  handleResponseOnError() {
    this.isSearchStarted = false;
    this.isSearchFinished = true;
    this.isErrorCaught = true;
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

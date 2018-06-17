import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { AppService, SearchResponse, SearchResponseResult } from '../../app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SearchComponent implements OnDestroy {
  searchResultsData: SearchResultsData;
  isSearchStarted: boolean;
  isSearchFinished: boolean;
  isError: boolean;
  private subscription: ISubscription;

  constructor(private appService: AppService) { }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  searchPhotos(searchText) {
    this.setValuesOnSearchStart();

    this.subscription = this.appService.searchPhotosBySearchText(searchText)
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
        height: result.height,
        width: result.width,
        color: result.color,
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
  height: number;
  width: number;
  color: string;
  smallUrl: string;
}

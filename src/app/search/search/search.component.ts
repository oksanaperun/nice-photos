import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { AppService, SearchResponse, SearchResponseResult, SearchResultsData, Item } from '../../app.service';

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

  searchPhotos(searchText: string) {
    this.setValuesOnSearchStart();

    this.subscription = this.appService.searchPhotosBySearchText(searchText)
      .subscribe(this.handleResponseOnSuccess.bind(this), this.handleResponseOnError.bind(this));
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

  handleResponseOnSuccess(response: SearchResponse) {
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

  transformSearchResponseResults(results: SearchResponseResult[]): Item[] {
    return results.map(({id, urls})=> ({id: id, smallUrl: urls.small}));
  }
}

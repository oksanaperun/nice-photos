import { Component, ChangeDetectionStrategy, OnDestroy, EventEmitter, Output } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { AppService, SearchResponse, SearchResponseResult, SearchResultsData, Item } from '../../app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SearchComponent implements OnDestroy {
  @Output() loading = new EventEmitter<boolean>();
  @Output() loaded = new EventEmitter<boolean>();
  @Output() failed = new EventEmitter<boolean>();

  searchResultsData: SearchResultsData;
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
    this.loading.emit(true);
    this.loaded.emit(false);
    this.failed.emit(false);
  }

  handleResponseOnSuccess(response: SearchResponse) {
    this.loading.emit(false);
    this.loaded.emit(true);
    this.searchResultsData = this.transformSearchResponse(response);
  }

  handleResponseOnError() {
    this.loading.emit(false);
    this.failed.emit(true);
  }

  transformSearchResponse(response: SearchResponse): SearchResultsData {
    return {
      totalCount: response.total,
      items: this.transformSearchResponseResults(response.results)
    };
  }

  transformSearchResponseResults(results: SearchResponseResult[]): Item[] {
    return results.map(({ id, urls }) => ({ id: id, smallUrl: urls.small }));
  }
}

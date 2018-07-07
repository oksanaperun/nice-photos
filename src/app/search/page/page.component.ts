import { Component, OnDestroy } from '@angular/core';
import { map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ISubscription } from 'rxjs/Subscription';
import { Bind } from 'lodash-decorators';
import { AppService, SearchResponse, SearchResponseResult, Item } from '../../app.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
})

export class PageComponent implements OnDestroy {
  searchText: string;

  isLoading: boolean;
  isFailed: boolean;

  pageNumber: number;
  totalPagesNumber: number;

  items: Item[];
  totalCount: number;

  subscription: ISubscription;

  constructor(private appService: AppService) { }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onFormSubmit(searchText: string) {
    this.searchText = searchText;
    this.searchItems();
  }

  searchItems() {
    this.setValuesOnLoading(false);
    this.getItemsAndSetData();
  }

  loadMore() {
    if (this.pageNumber < this.totalPagesNumber) {
      this.setValuesOnLoading(true);
      this.getItemsAndSetData();
    }
  }

  setValuesOnLoading(isLoadMore: boolean) {
    if (isLoadMore)
      this.pageNumber++;
    else {
      this.pageNumber = 1;
      this.items = [];
    }

    this.isLoading = true;
    this.isFailed = false;
  }

  getItemsAndSetData() {
    this.subscription = this.appService.getItems(this.searchText, this.pageNumber)
      .pipe(
        tap(this.setTotalPagesNumber),
        tap(this.setItems),
        map(this.setTotalCount),
        tap(this.stopLoadingOnSuccess),
        catchError(() => {
          this.stopLoadingOnError();
          return of(null);
        })
      ).subscribe();
  }

  @Bind()
  setTotalPagesNumber(response: SearchResponse) {
    this.totalPagesNumber = response.total_pages;
  }

  @Bind()
  setItems(response: SearchResponse) {
    const newItems = this.transformSearchResponseResults(response.results);

    this.items = this.items.concat(newItems);
  }

  transformSearchResponseResults(results: SearchResponseResult[]): Item[] {
    return results.map(({ id, color, urls }) => ({ id, color, smallUrl: urls.small }));
  }

  @Bind()
  setTotalCount(response: SearchResponse) {
    this.totalCount = response.total;
  }

  @Bind()
  stopLoadingOnSuccess() {
    this.isLoading = false;
  }

  stopLoadingOnError() {
    this.isLoading = false;
    this.isFailed = true;
  }

  get isLoaded(): boolean {
    return this.totalCount > - 1;
  }
}

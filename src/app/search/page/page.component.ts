import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AppService, SearchResponse, SearchResponseResult, Item } from '../../app.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
})

export class PageComponent {
  searchText: string;

  isLoading: boolean;
  isFailed: boolean;

  pageNumber: number;
  totalPagesNumber: number;

  items: Item[] = [];

  totalCount$: Observable<number>;

  constructor(private appService: AppService) { }

  onFormSubmit(searchText: string) {
    this.searchText = searchText;
    this.searchItems();
  }

  searchItems() {
    this.setValuesOnLoading(false);

    this.totalCount$ = this.appService.getItems(this.searchText, this.pageNumber)
      .pipe(
        tap(this.setTotalPagesNumber.bind(this)),
        tap(this.setItems.bind(this)),
        map(this.getTotalCount.bind(this)),
        tap(this.stopLoadingOnSuccess.bind(this)),
        catchError(() => {
          this.stopLoadingOnError();
          return of(null);
        })
      );
  }

  setValuesOnLoading(isLoadMore: boolean) {
    if (isLoadMore)
      this.pageNumber++;
    else this.pageNumber = 1;

    this.isLoading = true;
    this.isFailed = false;
  }

  stopLoadingOnSuccess() {
    this.isLoading = false;
  }

  stopLoadingOnError() {
    this.isLoading = false;
    this.isFailed = true;
  }

  setTotalPagesNumber(response: SearchResponse) {
    this.totalPagesNumber = response.total_pages;
  }

  setItems(response: SearchResponse) {
    const newItems = this.transformSearchResponseResults(response.results);

    this.items = this.items.concat(newItems);
  }

  transformSearchResponseResults(results: SearchResponseResult[]): Item[] {
    return results.map(({ id, urls }) => ({ id, smallUrl: urls.small }));
  }

  getTotalCount(response: SearchResponse): number {
    return response.total;
  }

  loadMore() {
    if (this.pageNumber < this.totalPagesNumber) {
      this.setValuesOnLoading(true);

      this.appService.getItems(this.searchText, this.pageNumber)
        .pipe(
          tap(this.setItems.bind(this)),
          tap(this.stopLoadingOnSuccess.bind(this)),
          catchError(() => {
            this.stopLoadingOnError();
            return of(null);
          })
        ).subscribe();
    }
  }
}

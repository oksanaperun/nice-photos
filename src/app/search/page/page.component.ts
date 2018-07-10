import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { distinct, filter, map, debounceTime, tap, flatMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Bind } from 'lodash-decorators';
import * as _ from 'lodash';
import { AppService, SearchResponse, SearchResponseResult, Item } from '../../app.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
})

export class PageComponent {
  isLoading: boolean;
  isFailed: boolean;

  totalPagesNumber: number;
  totalCount: number;

  items$: Observable<Item[]>;
  cache: Item[][];

  itemHeight = 320;
  numberOfItems = 3;
  debounceTime = 500;

  pageByManual$ = new BehaviorSubject(1);
  pageByScroll$ = this.getPageByScroll();
  pageByResize$ = this.getPageByResize();
  pageToLoad$ = this.getPageToLoad();

  constructor(private appService: AppService) { }

  getPageByScroll(): Observable<number> {
    return fromEvent(window, 'scroll')
      .pipe(
        map(() => window.scrollY),
        filter(current =>
          current >= document.body.clientHeight - window.innerHeight),
        debounceTime(this.debounceTime),
        distinct(),
        map(y => Math.ceil(
          (y + window.innerHeight) / (this.itemHeight * this.numberOfItems)
        )
        )
      );
  }

  getPageByResize(): Observable<number> {
    return fromEvent(window, 'resize')
      .pipe(
        debounceTime(this.debounceTime),
        map(_ => Math.ceil(
          (window.innerHeight + document.body.scrollTop) /
          (this.itemHeight * this.numberOfItems)
        ))
      );
  }

  getPageToLoad(): Observable<number> {
    return merge(
      this.pageByManual$,
      this.pageByScroll$,
      this.pageByResize$)
      .pipe(
        distinct(),
        filter(page => this.cache[page - 1] === undefined)
      );
  }

  onFormSubmit(searchText: string) {
    this.searchItems(searchText);
  }

  searchItems(searchText: string) {
    this.cache = [];

    this.items$ = this.pageToLoad$
      .pipe(
        tap(this.setValuesOnLoading),
        flatMap((page: number) => this.getItems(searchText, page)),
        map(() => _.flatMap(this.cache)),
        catchError(() => {
          this.stopLoadingOnError();
          return of(null);
        })
      );
  }

  getItems(searchText: string, page: number): Observable<Item[]> {
    return this.appService.getItems(searchText, page)
      .pipe(
        tap(this.setTotalPagesNumber),
        tap(this.setTotalCount),
        map((response) => this.transformSearchResponseResults(response.results)),
        tap(this.stopLoadingOnSuccess),
        tap(response => {
          this.cache[page - 1] = response;

          if (this.isNextPage(page)) {
            this.pageByManual$.next(page + 1);
          }
        })
      );
  }

  @Bind()
  setTotalPagesNumber(response: SearchResponse) {
    this.totalPagesNumber = response.total_pages;
  }

  @Bind()
  setTotalCount(response: SearchResponse) {
    this.totalCount = response.total;
  }

  transformSearchResponseResults(results: SearchResponseResult[]): Item[] {
    return results.map(({ id, color, urls }) => ({ id, color, smallUrl: urls.small }));
  }

  isNextPage(currentPage: number): boolean {
    if (currentPage < this.totalPagesNumber)
      return (this.itemHeight * this.numberOfItems * currentPage) < window.innerHeight;

    return false;
  }

  @Bind()
  setValuesOnLoading() {
    this.isLoading = true;
    this.isFailed = false;
  }

  @Bind()
  stopLoadingOnSuccess() {
    this.isLoading = false;
  }

  stopLoadingOnError() {
    this.isLoading = false;
    this.isFailed = true;
  }
}

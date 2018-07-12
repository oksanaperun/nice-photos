import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { distinct, filter, map, debounceTime, tap, flatMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Bind } from 'lodash-decorators';
import * as _ from 'lodash';
import { AppService, SearchResponse, SearchResponseResult, Item } from '../../app.service';
import { WINDOW } from '../../window.service';

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

  pageHeight = 320 * 3; // row height on rows number per page
  debounceTime = 200;

  pageByManual$ = new BehaviorSubject(1);
  pageByScroll$ = this.getPageByScroll();
  pageByResize$ = this.getPageByResize();
  pageToLoad$ = this.getPageToLoad();

  constructor(private appService: AppService, @Inject(WINDOW) private window: Window) {}

  getPageByScroll(): Observable<number> {
    return fromEvent(window, 'scroll')
      .pipe(
        map(() => window.scrollY),
        filter(current =>
          current >= document.body.clientHeight - window.innerHeight),
        debounceTime(this.debounceTime),
        distinct(),
        map(y => Math.ceil(
          (y + window.innerHeight) / this.pageHeight
        )
        )
      );
  }

  getPageByResize(): Observable<number> {
    return fromEvent(window, 'resize')
      .pipe(
        debounceTime(this.debounceTime),
        map(_ => Math.ceil(
          (window.innerHeight + document.body.scrollTop) / this.pageHeight
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
        filter(page => this.isPageNotInCache(page) && this.isPageToLoad(page))
      );
  }

  isPageNotInCache(page: number): boolean {
    return this.cache[page - 1] === undefined;
  }

  isPageToLoad(page: number): boolean {
    return !this.totalPagesNumber || page <= this.totalPagesNumber;
  }

  onFormSubmit(searchText: string) {
    this.searchItems(searchText);
  }

  searchItems(searchText: string) {
    this.setValuesOnSearchStart();

    this.items$ = this.pageToLoad$
      .pipe(
        flatMap((page: number) => this.getItems(searchText, page)),
        map(() => _.flatMap(this.cache))
      );
  }

  setValuesOnSearchStart() {
    this.cache = [];
    this.isLoading = true;
    this.isFailed = false;
  }

  getItems(searchText: string, page: number): Observable<Item[]> {
    return this.appService.getItems(searchText, page)
      .pipe(
        tap(this.setTotals),
        map((response) => this.transformSearchResponseResults(response.results)),
        tap(response => {
          this.cache[page - 1] = response;

          if ((this.pageHeight * page) < window.innerHeight)
            this.pageByManual$.next(page + 1);
        }),
        tap(() => this.stopLoadingOnLastPage(page)),
        catchError(() => {
          this.stopLoadingOnError();
          return of(null);
        })
      );
  }

  @Bind()
  setTotals(response: SearchResponse) {
    this.totalPagesNumber = response.total_pages;
    this.totalCount = response.total;
  }

  transformSearchResponseResults(results: SearchResponseResult[]): Item[] {
    return results.map(({ id, color, urls }) => ({ id, color, smallUrl: urls.small }));
  }

  stopLoadingOnLastPage(page: number) {
    if (this.totalPagesNumber === 0 || page === this.totalPagesNumber)
      this.isLoading = false;
  }

  stopLoadingOnError() {
    this.isLoading = false;
    this.isFailed = true;
  }
}

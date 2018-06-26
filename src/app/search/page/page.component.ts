import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Bind } from 'lodash-decorators';
import { AppService, SearchResponse, SearchResponseResult, SearchResultsData, Item } from '../../app.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
})

export class PageComponent {
  isLoading: boolean;
  isFailed: boolean;
  searchResultsData$: Observable<SearchResultsData>;

  constructor(private appService: AppService) { }

  onFormSubmit(searchText: string) {
    this.searchItems(searchText);
  }

  searchItems(searchText: string) {
    this.setValuesOnSearchStart();

    this.searchResultsData$ = this.appService.searchItemsBySearchText(searchText)
      .pipe(
        map(this.transformSearchResponse),
        tap(this.handleResponseOnSuccess),
        catchError(() => {
          this.handleResponseOnError();
          return of(null);
        })
      );
  }

  setValuesOnSearchStart() {
    this.isLoading = true;
    this.isFailed = false;
  }

  @Bind()
  handleResponseOnSuccess() {
    this.isLoading = false;
  }

  handleResponseOnError() {
    this.isLoading = false;
    this.isFailed = true;
  }

  @Bind()
  transformSearchResponse(response: SearchResponse): SearchResultsData {
    return {
      totalCount: response.total,
      items: this.transformSearchResponseResults(response.results)
    };
  }

  transformSearchResponseResults(results: SearchResponseResult[]): Item[] {
    return results.map(result => {
      return {
        id: result.id,
        height: result.height,
        width: result.width,
        color: result.color,
        smallUrl: result.urls.small
      };
    });
  }
}

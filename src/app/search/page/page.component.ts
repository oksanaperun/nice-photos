import { Component, ViewChild } from '@angular/core';
import { SearchComponent } from '../search';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
})

export class PageComponent {
  @ViewChild('search') searchComponent: SearchComponent;

  get isSpinner(): boolean {
    return this.searchComponent.isSearchStarted && !this.searchComponent.isSearchFinished;
  }

  get isResultsDataReady(): boolean {
    return this.searchComponent.isSearchFinished && !this.searchComponent.isError;
  }

  get isError(): boolean {
    return this.searchComponent.isSearchFinished && this.searchComponent.isError;
  }
}

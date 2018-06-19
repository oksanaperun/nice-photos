import { Component, ViewChild } from '@angular/core';
import { SearchComponent } from '../search';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
})

export class PageComponent {
  @ViewChild('search') searchComponent: SearchComponent;

  get isLoading(): boolean {
    return this.searchComponent.isSearchStarted && !this.searchComponent.isSearchFinished;
  }

  get isLoaded(): boolean {
    return this.searchComponent.isSearchFinished && !this.searchComponent.isError;
  }

  get isError(): boolean {
    return this.searchComponent.isSearchFinished && this.searchComponent.isError;
  }
}

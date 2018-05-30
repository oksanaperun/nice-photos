import { Component, ViewChild } from '@angular/core';
import { SearchComponent } from '../search';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
})

export class PageComponent {
  @ViewChild(SearchComponent) searchComponent: SearchComponent;

  get showError(): boolean {
    return this.searchComponent.isErrorCaught;
  }

  get showSpinner(): boolean {
    return this.searchComponent.isSearchStarted;
  }

  get showResults(): boolean {
    return this.searchComponent.isSearchFinished && !this.searchComponent.isErrorCaught;
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-results-item',
  templateUrl: './search-results-item.component.html',
  styleUrls: ['./search-results-item.component.css'],
})

export class SearchResultsItemComponent {
  @Input() item; // TODO: add type

  isLoaded = false;
  isLoadingFailed = false;

  get isLoading(): boolean {
    return !this.isLoaded && !this.isLoadingFailed;
  }

  onLoaded(): void {
    this.isLoaded = true;
  }

  onLoadingFailed(): void {
    this.isLoadingFailed = true;
  }
}

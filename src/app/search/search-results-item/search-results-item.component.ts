import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-results-item',
  templateUrl: './search-results-item.component.html',
  styleUrls: ['./search-results-item.component.css']
})

export class SearchResultsItemComponent {
  @Input() item; // TODO: add type after search component refactoring

  get isLoading(): boolean {
    return !this.item.isLoaded && !this.item.isLoadingFailed;
  }

  onLoaded(): void {
    this.item.isLoaded = true;
  }

  onLoadingFailed(): void {
    this.item.isLoadingFailed = true;
  }
}
import { Component, Input } from '@angular/core';
import { Item } from '../../app.service';

@Component({
  selector: 'app-search-results-item',
  templateUrl: './search-results-item.component.html',
  styleUrls: ['./search-results-item.component.css'],
})

export class SearchResultsItemComponent {
  @Input() item: Item;

  isLoaded = false;
  isLoadingFailed = false;

  loadingFailedPlaceholder = 'assets/loading_failed.png';

  get itemBoxStyle() {
    if (this.item && (!this.isLoaded || this.isLoadingFailed)) {
      return {
        'background-color': this.item.color
      };
    }
  }

  onLoaded(): void {
    this.isLoaded = true;
  }

  onLoadingFailed(): void {
    this.isLoadingFailed = true;
    this.item.smallUrl = this.loadingFailedPlaceholder;
  }
}

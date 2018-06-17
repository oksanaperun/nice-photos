import { Component, Input } from '@angular/core';
import { Photo } from '../search';

@Component({
  selector: 'app-search-results-item',
  templateUrl: './search-results-item.component.html',
  styleUrls: ['./search-results-item.component.css'],
})

export class SearchResultsItemComponent {
  @Input() item: Photo;

  isLoaded = false;
  isLoadingFailed = false;

  loadingFailedPlaceholder = 'assets/loading_failed.png';

  get itemBoxStyle() {
    if (this.item && (!this.isLoaded || this.isLoadingFailed))
      return {
        'background-color': this.item.color
      };
  }

  get itemStyle() {
    if (this.item && !this.isLoaded)
      return {
        'height': this.item.height + 'px',
        'width': this.item.width + 'px',
        'opacity': 0
      };
  }

  onLoaded(): void {
    this.isLoaded = true;
  }

  onLoadingFailed(): void {
    this.isLoadingFailed = true;
    this.item.smallUrl = this.loadingFailedPlaceholder;
  }
}

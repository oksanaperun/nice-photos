import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})

export class SearchResultsComponent {
  @Input() photos: any[];
  @Input() totalPhotosCount: number;
  @Input() isSearchInProgress: boolean;

  hideLoading(photo) {
    photo.hasLoaded = true;
  }

  hideImage(img) {
    img.style.display = 'none';
  }

  showLoadingError(photo) {
    photo.hasLoadingError = true;
  }
}
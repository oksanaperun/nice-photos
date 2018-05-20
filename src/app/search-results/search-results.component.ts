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

  showLoadingError(img, photo) {
    img.style.display = 'none';
    photo.hasLoadingError = true;
  }
}
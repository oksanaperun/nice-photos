import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-results-item',
  templateUrl: './search-results-item.component.html',
  styles: ['span {font-family: \'Nunito\', serif; color: rgba(0, 0, 0, 0.5);}']
})

export class SearchResultsItemComponent {
  @Input() item; // TODO: add type after search component refactoring

  get isLoadingInProgress() {
    return !this.item.isLoadingDone && !this.item.isLoadingError;
  }

  get isLoadingError() {
    return this.item.isLoadingError;
  }

  setLoadingDone() {
    this.item.isLoadingDone = true;
  }

  setLoadingError() {
    this.item.isLoadingError = true;
  }

  hideImage(img) {
    img.style.display = 'none';
  }
}
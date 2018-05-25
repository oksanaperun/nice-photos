import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styles: ['.is-loading {opacity: 0.5;}']
})

export class SearchResultsComponent {
  @Input() items; // TODO: add type after search component refactoring
  @Input() totalCount: number;
  @Input() isSearchInProgress: boolean;
}
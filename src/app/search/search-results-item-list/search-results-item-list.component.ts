import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-results-item-list',
  templateUrl: './search-results-item-list.component.html',
  styles: ['mat-grid-list {width: 90%; left: 5%;}']
})

export class SearchResultsItemListComponent {
  @Input() items; // TODO: add type after search component refactoring
}
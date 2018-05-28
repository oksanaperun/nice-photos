import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-search-results-item-list',
  templateUrl: './search-results-item-list.component.html',
  styleUrls: ['./search-results-item-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SearchResultsItemListComponent {
  @Input() items; // TODO: add type after search component refactoring
}
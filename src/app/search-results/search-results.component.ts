import { Component, Input } from '@angular/core';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})

export class SearchResultsComponent {
  @Input() photos;
  @Input() totalPhotosCount: number;
  @Input() processedSearchText: string;
  @Input() isSearchInProgress: boolean;
  searchTips = [
    'Check your spelling and try again',
    'Try a similar but different search term',
    'Be less specific in your wording for a wider search result'
  ];

  constructor() { }
}
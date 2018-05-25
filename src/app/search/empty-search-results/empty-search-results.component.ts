import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-search-results',
  templateUrl: './empty-search-results.component.html',
  styleUrls: ['./empty-search-results.component.css']
})

export class EmptySearchResultsComponent {
  @Input() searchText: string;
  searchTips = [
    'Check your spelling and try again',
    'Try a similar but different search term',
    'Be less specific in your wording for a wider search result'
  ];
}
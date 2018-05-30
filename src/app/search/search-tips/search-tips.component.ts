import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-search-tips',
  templateUrl: './search-tips.component.html',
  styleUrls: ['./search-tips.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SearchTipsComponent {
  searchTips = [
    'Check your spelling and try again',
    'Try a similar but different search term',
    'Be less specific in your wording for a wider search result'
  ];
}

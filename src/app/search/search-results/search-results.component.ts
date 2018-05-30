import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { SearchResultsData } from '../search';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SearchResultsComponent {
  @Input() data: SearchResultsData;

  get showTips(): boolean {
    return this.data.totalCount === 0;
  }
}

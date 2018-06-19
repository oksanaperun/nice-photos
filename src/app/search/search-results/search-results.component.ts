import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { SearchResultsData } from '../../app.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SearchResultsComponent {
  @Input() data: SearchResultsData;

  get showItemList(): boolean {
    return this.data.totalCount > 0;
  }
}

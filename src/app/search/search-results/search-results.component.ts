import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { SearchResultsData, Item } from '../../app.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SearchResultsComponent {
  @Input() totalCount: number;
  @Input() items: Item[];

  get showItemList(): boolean {
    return this.totalCount > 0;
  }
}

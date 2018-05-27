import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-search-results-total-count',
  templateUrl: './search-results-total-count.component.html',
  styleUrls: ['./search-results-total-count.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchResultsTotalCountComponent {
  @Input() totalCount: number;

  get showTotalCount(): boolean {
    return this.totalCount > 0;
  }
}
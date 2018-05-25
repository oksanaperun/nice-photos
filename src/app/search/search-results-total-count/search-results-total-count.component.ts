import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-results-total-count',
  templateUrl: './search-results-total-count.component.html',
  styleUrls: ['./search-results-total-count.component.css']
})

export class SearchResultsTotalCountComponent {
  @Input() totalCount: number;
}
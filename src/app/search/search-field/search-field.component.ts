import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SearchTextErrorStateMatcher } from './searchTextErrorStateMatcher';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SearchFieldComponent {
  searchInput = new FormControl('', [
    Validators.required,
    Validators.pattern('((?=.*[a-zA-Z])|(?=.*[0-9]))[a-zA-Z0-9 ]+')
  ]);
  matcher = new SearchTextErrorStateMatcher();
}

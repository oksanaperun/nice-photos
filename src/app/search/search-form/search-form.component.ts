import { Component, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SearchFormComponent {
  @Output() formSubmit = new EventEmitter<string>();

  onSubmit(searchText: string) {
    this.formSubmit.emit(searchText);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatGridListModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { SearchComponent } from './search';
import { SearchResultsComponent } from './search-results';
import { SearchResultsItemComponent } from './search-results-item';
import { SearchResultsItemListComponent } from './search-results-item-list';
import { SearchResultsTotalCountComponent } from './search-results-total-count';
import { EmptySearchResultsComponent } from './empty-search-results';

@NgModule({
  declarations: [
    SearchComponent,
    SearchResultsComponent,
    SearchResultsItemComponent,
    SearchResultsItemListComponent,
    SearchResultsTotalCountComponent,
    EmptySearchResultsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatProgressSpinnerModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
  ],
  exports: [SearchComponent]
})

export class SearchModule { }
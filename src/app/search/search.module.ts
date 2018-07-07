import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatGridListModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PageComponent } from './page';
import { SearchFormComponent } from './search-form';
import { SearchFieldComponent } from './search-field';
import { SearchErrorComponent } from './search-error';
import { SearchSpinnerComponent } from './search-spinner';
import { SearchResultsComponent } from './search-results';
import { SearchResultsItemComponent } from './search-results-item';
import { SearchResultsItemListComponent } from './search-results-item-list';
import { SearchResultsTotalCountComponent } from './search-results-total-count';
import { SearchTipsComponent } from './search-tips';

@NgModule({
  declarations: [
    PageComponent,
    SearchFormComponent,
    SearchFieldComponent,
    SearchErrorComponent,
    SearchSpinnerComponent,
    SearchResultsComponent,
    SearchResultsItemComponent,
    SearchResultsItemListComponent,
    SearchResultsTotalCountComponent,
    SearchTipsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatProgressSpinnerModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
  ],
  exports: [PageComponent]
})

export class SearchModule { }

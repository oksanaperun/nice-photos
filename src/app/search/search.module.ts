import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatGridListModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { SearchComponent } from './search//search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { EmptySearchResultsComponent } from './empty-search-results/empty-search-results.component';

@NgModule({
  declarations: [
    SearchComponent,
    SearchResultsComponent,
    EmptySearchResultsComponent
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
  exports: [
    SearchComponent
  ],
  providers: []
})

export class SearchModule { }
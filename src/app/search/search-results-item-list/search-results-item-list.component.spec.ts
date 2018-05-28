import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatGridListModule } from '@angular/material';
import { SearchResultsItemListComponent } from './search-results-item-list.component';

describe('SearchResultsItemListComponent', () => {
  let component: SearchResultsItemListComponent;
  let fixture: ComponentFixture<SearchResultsItemListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsItemListComponent],
      imports: [MatGridListModule],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(SearchResultsItemListComponent);
    component = fixture.componentInstance;
  });

  it('should be rendered correctly', () => {
    component.items = [1, 2, 3];
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchResultsItemListComponent } from './search-results-item-list.component';

describe('SearchResultsItemListComponent', () => {
  let component: SearchResultsItemListComponent;
  let fixture: ComponentFixture<SearchResultsItemListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsItemListComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultsItemListComponent);
    component = fixture.componentInstance;
    component.items = [1, 2, 3];
    fixture.detectChanges();
  });

  it('should render items list', () => {
    expect(fixture).toMatchSnapshot();
  });
});

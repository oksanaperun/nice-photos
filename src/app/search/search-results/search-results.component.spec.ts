import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchResultsComponent } from './search-results.component';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
  });

  it('should render item list when total items count is greater than zero', () => {
    component.totalCount = 2;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should render search tips when total items count equals zero', () => {
    component.totalCount = 0;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});

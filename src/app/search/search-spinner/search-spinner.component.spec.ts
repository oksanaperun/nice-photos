import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchSpinnerComponent } from './search-spinner.component';

describe('SearchSpinnerComponent', () => {
  let component: SearchSpinnerComponent;
  let fixture: ComponentFixture<SearchSpinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchSpinnerComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchSpinnerComponent);
    component = fixture.componentInstance;
  });

  it('should render spinner', () => {
    expect(fixture).toMatchSnapshot();
  });
});

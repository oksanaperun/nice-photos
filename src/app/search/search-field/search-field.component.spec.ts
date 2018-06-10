import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchFieldComponent } from './search-field.component';

describe('SearchFieldComponent', () => {
  let component: SearchFieldComponent;
  let fixture: ComponentFixture<SearchFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFieldComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFieldComponent);
    component = fixture.componentInstance;
  });

  it('should NOT render error when input is valid', () => {
    component.searchInput.setValue('abc');

    expect(fixture).toMatchSnapshot();
  });

  it('should render error when input contains special character', () => {
    component.searchInput.setValue('ab,c');
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should render error when input contains only spaces', () => {
    component.searchInput.setValue('  ');
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should render error when input is empty', () => {
    component.searchInput.setValue('');
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});

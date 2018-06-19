import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PageComponent } from './page.component';
import { SearchComponent } from '../search';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    component.searchComponent = new SearchComponent(null);
  });

  it('should render only search form by default', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render spinner when search started', () => {
    component.searchComponent.isSearchStarted = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should render search results when search finished', () => {
    component.searchComponent.isSearchFinished = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should render error when search finished with error', () => {
    component.searchComponent.isSearchFinished = true;
    component.searchComponent.isError = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});

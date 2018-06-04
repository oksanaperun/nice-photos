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

  it('should be rendered correctly by default', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should be rendered correctly when search started', () => {
    component.searchComponent.isSearchStarted = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should be rendered correctly when search finished', () => {
    component.searchComponent.isSearchFinished = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should be rendered correctly when search finished with error', () => {
    component.searchComponent.isSearchFinished = true;
    component.searchComponent.isError = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});

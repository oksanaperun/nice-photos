import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PageComponent } from './page.component';

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
  });

  it('should render only search form by default', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render spinner when search started', () => {
    component.isLoading = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should render search results when search finished', () => {
    component.isLoaded = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should render error when search finished with error', () => {
    component.isFailed = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});

import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { SearchResultsItemComponent } from './search-results-item.component';

describe('SearchResultsItemComponent', () => {
  let component: SearchResultsItemComponent;
  let fixture: ComponentFixture<SearchResultsItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultsItemComponent);
    component = fixture.componentInstance;
    component.item = { id: 'some', smallUrl: 'some-url', height: 50, width: 100, color: '#add4dd' };

    fixture.detectChanges();
  });

  it('should render image', () => {
    component.isLoaded = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should NOT display image when image is loading', () => {
    component.isLoaded = false;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('img.loaded')))
      .toBeFalsy();
  });

  it('should display placeholder when image is loading', () => {
    component.isLoaded = false;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should display placeholder when image loading is failed', () => {
    component.onLoadingFailed();
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});

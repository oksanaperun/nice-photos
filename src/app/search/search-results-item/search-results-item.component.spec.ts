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
    component.item = {smallUrl: 'some-url'};

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

    expect(fixture.debugElement.query(By.css('img.hidden')))
      .toBeTruthy();
  });

  it('should NOT display image when image loading is failed', () => {
    component.isLoadingFailed = true;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('img.hidden')))
      .toBeTruthy();
  });

  it('should notify that image is loading', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should notify that image loading is failed', () => {
    component.isLoadingFailed = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});

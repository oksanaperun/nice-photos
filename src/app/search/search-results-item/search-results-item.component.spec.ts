import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SearchResultsItemComponent } from './search-results-item.component';

describe('SearchResultsItemComponent', () => {
  const photoWithValidImage = { smallUrl: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' };
  const photoWithInvalidImage = { smallUrl: 'data:image/jpeg;base64,' };
  let component: SearchResultsItemComponent;
  let fixture: ComponentFixture<SearchResultsItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsItemComponent]
    });

    fixture = TestBed.createComponent(SearchResultsItemComponent);
    component = fixture.componentInstance;
  });

  it('should be rendered correctly when image is not loaded yet', () => {
    component.item = photoWithValidImage;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  // TODO: find mock for onload event
  xit('should be rendered correctly when image has loaded', async(() => {
    expect.assertions(1);
    component.item = photoWithValidImage;
    fixture.detectChanges();

    const debugElem = fixture.debugElement.query(By.css('img'));
    const elem = debugElem.nativeElement;

    elem.onload = () => {
      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
    };
  }));

  // TODO: find mock for onerror event
  xit('should be rendered correctly when image has loading error', async(() => {
    expect.assertions(1);
    component.item = photoWithInvalidImage;
    fixture.detectChanges();

    const debugElem = fixture.debugElement.query(By.css('img'));
    const elem = debugElem.nativeElement;

    elem.onerror = () => {
      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
    };
  }));
});
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

  it('should show loading text when image is not loaded yet', () => {
    component.item = photoWithValidImage;
    fixture.detectChanges();

    const debugElem = fixture.debugElement.query(By.css('span'));

    expect(debugElem.nativeElement.innerText).toBe('Loading...');
  });

  it('should hide span element when image has loaded', async(() => {
    component.item = photoWithValidImage;
    fixture.detectChanges();

    const debugElem = fixture.debugElement.query(By.css('img'));
    const elem = debugElem.nativeElement;

    elem.onload = () => {
      fixture.detectChanges();

      const debugElems = fixture.debugElement.queryAll(By.css('span'));

      expect(debugElems.length).toBe(0);
    };
  }));

  it('should hide image when image can not be loaded', async(() => {
    component.item = photoWithInvalidImage;
    fixture.detectChanges();

    const debugElem = fixture.debugElement.query(By.css('img'));
    const elem = debugElem.nativeElement;

    elem.onerror = () => {
      fixture.detectChanges();

      expect(elem.style.display).toBe('none');
    };
  }));

  it('should show loading error text when image can not be loaded', async(() => {
    component.item = photoWithInvalidImage;
    fixture.detectChanges();

    const debugElem = fixture.debugElement.query(By.css('img'));
    const elem = debugElem.nativeElement;

    elem.onerror = () => {
      fixture.detectChanges();

      const debugElem = fixture.debugElement.query(By.css('span'));

      expect(debugElem.nativeElement.innerText).toBe('Photo can\'t be loaded');
    };
  }));
});

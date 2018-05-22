import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material';
import { SearchResultsComponent } from './search-results.component';

describe('SearchResultsComponent', () => {
  const photoWithValidImage = { smallUrl: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' };
  const photoWithInvalidImage = { smallUrl: 'data:image/jpeg;base64,' };
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsComponent],
      imports: [MatGridListModule]
    });

    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render total photos count', () => {
    component.totalPhotosCount = 10;
    fixture.detectChanges();

    const debugElem = fixture.debugElement.query(By.css('h5'));

    expect(debugElem.nativeElement.innerText).toContain(component.totalPhotosCount.toString());
  });

  it('should render photo tiles', () => {
    component.photos = [photoWithValidImage, photoWithValidImage, photoWithValidImage];
    fixture.detectChanges();

    const debugElems = fixture.debugElement.queryAll(By.css('mat-grid-tile'));

    expect(debugElems.length).toBe(component.photos.length);
  });

  it('should show loading text when image is not loaded yet', () => {
    component.photos = [photoWithValidImage];
    fixture.detectChanges();

    const debugElem = fixture.debugElement.query(By.css('span'));

    expect(debugElem.nativeElement.innerText).toBe('Loading...');
  });

  it('should hide span element when image has loaded', async(() => {
    component.photos = [photoWithValidImage];
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
    component.photos = [photoWithInvalidImage];
    fixture.detectChanges();

    const debugElem = fixture.debugElement.query(By.css('img'));
    const elem = debugElem.nativeElement;

    elem.onerror = () => {
      fixture.detectChanges();

      expect(elem.style.display).toBe('none');
    };
  }));

  it('should show loading error text when image can not be loaded', async(() => {
    component.photos = [photoWithInvalidImage];
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
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material';
import { SearchResultsComponent } from './search-results.component';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsComponent],
      imports: [MatGridListModule]
    });

    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
    component.photos = [1, 2, 3];
    fixture.detectChanges();

    const debugElems = fixture.debugElement.queryAll(By.css('mat-grid-tile'));

    expect(debugElems.length).toBe(component.photos.length);
  });

  it('should show loading text when photo is not loaded yet', () => {
    component.photos = [{ hasLoaded: false }];
    fixture.detectChanges();

    const debugElem = fixture.debugElement.query(By.css('mat-grid-tile span'));

    expect(debugElem.nativeElement.innerText).toBe('Loading...');
  });

  it('should show loading error text when photo has loading error', () => {
    component.photos = [{ hasLoadingError: true }];
    fixture.detectChanges();

    const debugElem = fixture.debugElement.query(By.css('mat-grid-tile span'));

    expect(debugElem.nativeElement.innerText).toBe('Photo can\'t be loaded');
  });

  xit('should call #hideLoading when image has loaded', () => {
    const spy = spyOn(component, 'hideLoading');

    // emulate image onload
    expect(spy).toHaveBeenCalled();
  });

  xit('should call #hideImage when image has loading error', () => {
    const spy = spyOn(component, 'hideImage');

    // emulate image onerror
    expect(spy).toHaveBeenCalled();
  });

  xit('should call #showLoadingError when image has loading error', () => {
    const spy = spyOn(component, 'showLoadingError');

    // emulate image onerror
    expect(spy).toHaveBeenCalled();
  });
});
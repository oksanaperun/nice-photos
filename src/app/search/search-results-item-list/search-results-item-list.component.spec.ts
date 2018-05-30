import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material';
import { SearchResultsItemListComponent } from './search-results-item-list.component';

describe('SearchResultsItemListComponent', () => {
  const photoWithValidImage = { smallUrl: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' };
  let component: SearchResultsItemListComponent;
  let fixture: ComponentFixture<SearchResultsItemListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsItemListComponent],
      imports: [MatGridListModule],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(SearchResultsItemListComponent);
    component = fixture.componentInstance;
  });

  it('should render photo tiles', () => {
    component.items = [photoWithValidImage, photoWithValidImage, photoWithValidImage];
    fixture.detectChanges();

    const debugElems = fixture.debugElement.queryAll(By.css('mat-grid-tile'));

    expect(debugElems.length).toBe(component.items.length);
  });
});

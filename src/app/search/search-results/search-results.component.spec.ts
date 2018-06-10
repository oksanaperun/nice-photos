import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SearchResultsComponent } from './search-results.component';
import { Photo } from '../search';

@Component({
  selector: 'app-search-results-total-count',
  template: ''
})
class MockSearchResultsTotalCountComponent {
  @Input() totalCount: number;
}

@Component({
  selector: 'app-search-results-item-list',
  template: ''
})
class MockSearchResultsItemListComponent {
  @Input() items: Photo[];
}

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  const testData = {
    totalCount: 2,
    items: [{ id: '1', smallUrl: 'url1' }, { id: '2', smallUrl: 'url2' }]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchResultsComponent,
        MockSearchResultsTotalCountComponent,
        MockSearchResultsItemListComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
  });

  it('should bind data to SearchResultsTotalCountComponent', () => {
    component.data = testData;
    fixture.detectChanges();

    const totalCountElem = fixture.debugElement.query(By.css('app-search-results-total-count'));
    const totalCountComp = totalCountElem.injector.get(MockSearchResultsTotalCountComponent);

    expect(totalCountComp.totalCount).toBe(testData.totalCount);
  });

  it('should bind data to SearchResultsItemListComponent', () => {
    component.data = testData;
    fixture.detectChanges();

    const itemListElem = fixture.debugElement.query(By.css('app-search-results-item-list'));
    const itemListComp = itemListElem.injector.get(MockSearchResultsItemListComponent);

    expect(itemListComp.items).toBe(testData.items);
  });

  it('should be rendered correctly when total items count is greater than zero', () => {
    component.data = { totalCount: 2 };
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should be rendered correctly when total items count equals zero', () => {
    component.data = { totalCount: 0 };
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});

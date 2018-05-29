import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SearchResultsTotalCountComponent } from './search-results-total-count.component';

describe('SearchResultsTotalCountComponent', () => {
  let component: SearchResultsTotalCountComponent;
  let fixture: ComponentFixture<SearchResultsTotalCountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsTotalCountComponent]
    });

    fixture = TestBed.createComponent(SearchResultsTotalCountComponent);
    component = fixture.componentInstance;
  });

  it('should be rendered correctly when total items count equals 1', () => {
    component.totalCount = 1;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should be rendered correctly when total items count is greater than 1', () => {
    component.totalCount = 10;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
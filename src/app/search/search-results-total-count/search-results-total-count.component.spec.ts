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

  it('should render total items count when it equals 0', () => {
    component.totalCount = 0;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should render total items count when it equals 1', () => {
    component.totalCount = 1;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should render total items count when it is greater than 1', () => {
    component.totalCount = 10;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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

  it('should render total items count', () => {
    component.totalCount = 10;
    fixture.detectChanges();

    const debugElem = fixture.debugElement.query(By.css('h5'));

    expect(debugElem.nativeElement.innerText).toContain(component.totalCount.toString());
  });
});

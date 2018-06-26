import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SearchTipsComponent } from './search-tips.component';

describe('SearchTipsComponent', () => {
  let component: SearchTipsComponent;
  let fixture: ComponentFixture<SearchTipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchTipsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchTipsComponent);
    component = fixture.componentInstance;
  });

  it('should render tips', () => {
    component.searchTips = ['tip1', 'tip2'];
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});

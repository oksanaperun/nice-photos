import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SearchErrorComponent } from './search-error.component';

describe('SearchErrorComponent', () => {
  let component: SearchErrorComponent;
  let fixture: ComponentFixture<SearchErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchErrorComponent);
    component = fixture.componentInstance;
  });

  it('should render message', () => {
    expect(fixture).toMatchSnapshot();
  });
});

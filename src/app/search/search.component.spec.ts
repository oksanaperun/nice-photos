import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatGridListModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { EmptySearchResultsComponent } from '../empty-search-results/empty-search-results.component';
import { PhotoService } from '../photo.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        SearchResultsComponent,
        EmptySearchResultsComponent
      ],
      imports: [
        FormsModule,
        MatButtonModule,
        MatGridListModule,
        MatInputModule,
        MatProgressSpinnerModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [{ provide: PhotoService, useValue: null }]
    });

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

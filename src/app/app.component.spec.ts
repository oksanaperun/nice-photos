import { TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatGridListModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { EmptySearchResultsComponent } from './empty-search-results/empty-search-results.component';
import { PhotoService } from './photo.service';

describe('AppComponent', () => {
  const title = 'Nice photos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
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
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  }));

  it(`should have as title ${title}`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app.title).toEqual(title);
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('h1').textContent).toContain(title);
  }));
});

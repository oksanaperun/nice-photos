import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search.component';
import { AppService } from '../../app.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [
        FormsModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [{ provide: AppService, useValue: null }],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

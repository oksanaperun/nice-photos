import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { AppService } from './app.service';

describe('AppComponent', () => {
  const title = 'Nice photos';

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: AppService, useValue: null }]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
  });

  it(`should have as title ${title}`, () => {
    expect(component.title).toEqual(title);
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('h1').textContent).toContain(title);
  });
});

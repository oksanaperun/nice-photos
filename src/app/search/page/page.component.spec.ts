import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import { PageComponent } from './page.component';
import { AppService, SearchResponse, SearchResponseResult, Item } from '../../app.service';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;
  let appService: AppService;
  const searchText = 'abc';
  const result: SearchResponseResult = {
    id: 'some-id',
    color: '#add4dd',
    urls: { small: 'some-url', regular: 'some-url' }
  };
  const transformedResult: Item = {
    id: result.id,
    color: '#add4dd',
    smallUrl: result.urls.small
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageComponent],
      providers: [AppService, { provide: HttpClient, useValue: null }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
  });

  it('should render only search form by default', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render spinner when search started', () => {
    component.isLoading = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should render search results when there are search results data', () => {
    component.totalCount = 0;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should render error when search finished with error', () => {
    component.isFailed = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should call #searchItems on form submit', () => {
    spyOn(component, 'searchItems');
    component.onFormSubmit(searchText);

    expect(component.searchItems).toHaveBeenCalledWith(searchText);
  });

  it('should set properties on loading when search items', () => {
    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'getItems').and.returnValue(Observable.of(null).delay(200));

    component.searchItems(searchText);

    component.items$.subscribe(() => {
      expect(component.isLoading).toBe(true);
      expect(component.isFailed).toBe(false);
    });
  });

  it('should call AppService with search text and page number when search items', () => {
    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'getItems').and.returnValue(Observable.of(null));

    component.searchItems(searchText);

    component.items$.subscribe(() => {
      expect(appService.getItems).toHaveBeenCalledWith(searchText, 1);
    });
  });

  it('should set properties on success call to AppService when search items', () => {
    const response: SearchResponse = { total: 2, total_pages: 3, results: [result, result] };

    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'getItems').and.returnValue(Observable.of(response));

    component.searchItems(searchText);

    component.items$.subscribe(response => {
      expect(component.isLoading).toBe(false);
      expect(component.isFailed).toBe(false);
      expect(component.totalCount).toBe(2);
      expect(component.totalPagesNumber).toBe(3);
      expect(response).toEqual([transformedResult, transformedResult]);
    })
  });

  it('should set properties on failed call to AppService when search items', () => {
    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'getItems').and.returnValue(Observable.throw({ status: 500 }));

    component.searchItems(searchText);

    component.items$.subscribe(response => {
      expect(component.isLoading).toBe(false);
      expect(component.isFailed).toBe(true);
      expect(response).toBe(null);
    });
  });
});

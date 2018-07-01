import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { PageComponent } from './page.component';
import { AppService, SearchResponse, SearchResponseResult, SearchResultsData, Item } from '../../app.service';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;
  let appService: AppService;
  const searchText = 'abc';

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
    component.totalCount$ = Observable.of(0);
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should render error when search finished with error', () => {
    component.isFailed = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should set properties on started search', () => {
    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'getItems').and.returnValue(Observable.of(null));

    component.handleResponseOnSuccess = jest.fn();
    component.searchItems(searchText);

    expect(component.isLoading).toBe(true);
    expect(component.isFailed).toBe(false);
    expect(component.pageNumber).toBe(1);
  });

  it('should call AppService with search text and page number', () => {
    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'getItems').and.returnValue(Observable.of(null));
    component.handleResponseOnSuccess = jest.fn();
    component.searchItems(searchText);

    expect(appService.getItems).toBeCalledWith(searchText, 1);
  });

  it('should set properties on success call to AppService', () => {
    const result: SearchResponseResult = {
      id: 'some-id',
      urls: { small: 'some-url', regular: 'some-url' }
    };
    const transformedResult: Item = {
      id: result.id,
      smallUrl: result.urls.small
    };
    const response: SearchResponse = { total: 2, results: [result, result] };

    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'getItems').and.returnValue(Observable.of(response));

    component.searchItems(searchText);

    component.totalCount$.subscribe(response => {
      expect(component.isLoading).toBe(false);
      expect(component.isFailed).toBe(false);
      expect(response).toEqual(2);
    });
  });

  it('should set properties on failed call to AppService', () => {
    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'getItems').and.returnValue(Observable.throw({ status: 500 }));

    component.searchItems(searchText);

    component.totalCount$.subscribe(response => {
      expect(component.isLoading).toBe(false);
      expect(component.isFailed).toBe(true);
      expect(response).toBe(null);
    });
  });
});

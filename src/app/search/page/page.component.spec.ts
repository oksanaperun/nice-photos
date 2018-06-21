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
    component.searchResultsData$ = Observable.of({ totalCount: 0, items: [] });
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
    spyOn(appService, 'searchPhotosBySearchText').and.returnValue(Observable.of(null));

    component.handleResponseOnSuccess = jest.fn();
    component.searchPhotos(searchText);

    expect(component.isLoading).toBe(true);
    expect(component.isFailed).toBe(false);
  });

  it('should call AppService with search text', () => {
    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'searchPhotosBySearchText').and.returnValue(Observable.of(null));
    component.handleResponseOnSuccess = jest.fn();
    component.searchPhotos(searchText);

    expect(appService.searchPhotosBySearchText).toBeCalledWith(searchText);
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
    const transformedResponse: SearchResultsData = { totalCount: 2, items: [transformedResult, transformedResult] };

    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'searchPhotosBySearchText').and.returnValue(Observable.of(response));

    component.searchPhotos(searchText);

    component.searchResultsData$.subscribe(response => {
      expect(component.isLoading).toBe(false);
      expect(component.isFailed).toBe(false);
      expect(response).toEqual(transformedResponse);
    });
  });

  it('should set properties on failed call to AppService', () => {
    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'searchPhotosBySearchText').and.returnValue(Observable.throw({ status: 500 }));

    component.searchPhotos(searchText);

    component.searchResultsData$.subscribe(response => {
      expect(component.isLoading).toBe(false);
      expect(component.isFailed).toBe(true);
      expect(response).toBe(null);
    });
  });

});

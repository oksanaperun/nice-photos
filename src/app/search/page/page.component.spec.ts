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
    urls: { small: 'some-url', regular: 'some-url' }
  };
  const transformedResult: Item = {
    id: result.id,
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
    component.totalCount$ = Observable.of(0);
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should render error when search finished with error', () => {
    component.isFailed = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should set #searchText and call #searchItems on form submit', () => {
    spyOn(component, 'searchItems');
    component.onFormSubmit(searchText);

    expect(component.searchText).toBe(searchText);
    expect(component.searchItems).toHaveBeenCalled();
  });

  it('should set properties on loading when search items', () => {
    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'getItems').and.returnValue(Observable.of(null));

    component.searchItems();

    expect(component.isLoading).toBe(true);
    expect(component.isFailed).toBe(false);
    expect(component.pageNumber).toBe(1);
  });

  it('should call AppService with search text and page number when search items', () => {
    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'getItems').and.returnValue(Observable.of(null));

    component.searchText = searchText;
    component.searchItems();

    expect(appService.getItems).toHaveBeenCalledWith(searchText, 1);
  });

  it('should set properties on success call to AppService when search items', () => {
    const response: SearchResponse = { total: 2, total_pages: 3, results: [result, result] };

    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'getItems').and.returnValue(Observable.of(response));

    component.searchItems();

    component.totalCount$.subscribe(totalCount => {
      expect(component.isLoading).toBe(false);
      expect(component.isFailed).toBe(false);
      expect(totalCount).toBe(2);
      expect(component.totalPagesNumber).toBe(3);
      expect(component.items).toEqual([transformedResult, transformedResult]);
    });
  });

  it('should set properties on failed call to AppService when search items', () => {
    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'getItems').and.returnValue(Observable.throw({ status: 500 }));

    component.searchItems();

    component.totalCount$.subscribe(response => {
      expect(component.isLoading).toBe(false);
      expect(component.isFailed).toBe(true);
      expect(response).toBe(null);
    });
  });

  it('should set properties on loading when load more', () => {
    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'getItems').and.returnValue(Observable.of(null).delay(500));

    component.pageNumber = 2;
    component.totalPagesNumber = 3;
    component.loadMore();

    expect(component.isLoading).toBe(true);
    expect(component.isFailed).toBe(false);
    expect(component.pageNumber).toBe(3);
  });

  it('should call AppService with search text and page number when load more', () => {
    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'getItems').and.returnValue(Observable.of(null));

    component.searchText = searchText;
    component.pageNumber = 2;
    component.totalPagesNumber = 3;
    component.loadMore();

    expect(appService.getItems).toHaveBeenCalledWith(searchText, 3);
  });

  it('should set properties on success call to AppService when load more', () => {
    const response: SearchResponse = { total: 3, total_pages: 2, results: [result] };

    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'getItems').and.returnValue(Observable.of(response));

    component.pageNumber = 2;
    component.totalPagesNumber = 3;
    component.items = [transformedResult, transformedResult];
    component.loadMore();

    expect(component.isLoading).toBe(false);
    expect(component.isFailed).toBe(false);
    expect(component.items).toEqual([transformedResult, transformedResult, transformedResult]);
  });

  it('should set properties on failed call to AppService when load more', () => {
    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'getItems').and.returnValue(Observable.throw({ status: 500 }));

    component.pageNumber = 2;
    component.totalPagesNumber = 3;
    component.loadMore();

    expect(component.isLoading).toBe(false);
    expect(component.isFailed).toBe(true);
  });

  it('should not call AppService when load more and page number equals to total pages number', () => {
    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'getItems').and.returnValue(Observable.of(null));

    component.pageNumber = 2;
    component.totalPagesNumber = 2;
    component.loadMore();

    expect(appService.getItems).not.toHaveBeenCalled();
  });
});

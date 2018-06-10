import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { SearchComponent, SearchResultsData, Photo } from './search.component';
import { SearchFieldComponent } from '../search-field';
import { AppService, SearchResponse, SearchResponseResult } from '../../app.service';

@Component({
  selector: 'app-search-field',
  template: '<div></div>'
})
class MockSearchFieldComponent {
  searchInput = new FormControl('');
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let appService: AppService;
  const searchText = 'abc';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent, MockSearchFieldComponent],
      imports: [FormsModule],
      providers: [AppService, { provide: HttpClient, useValue: null }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  it('should manage correctly started search', () => {
    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'searchPhotosBySearchText').and.returnValue(Observable.of(null));
    component.handleResponseOnSuccess = jest.fn();
    component.searchPhotos(searchText);

    expect(component.isSearchStarted).toBe(true);
    expect(component.isSearchFinished).toBe(false);
    expect(component.isError).toBe(false);
  });

  it('should call AppService with search text', () => {
    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'searchPhotosBySearchText').and.returnValue(Observable.of(null));
    component.handleResponseOnSuccess = jest.fn();
    component.searchPhotos(searchText);

    expect(appService.searchPhotosBySearchText).toBeCalledWith(searchText);
  });

  it('should manage correctly success call to AppService', () => {
    const result: SearchResponseResult = {
      id: 'some-id',
      urls: { small: 'some-url', regular: 'some-url' }
    };
    const transformedResult: Photo = {
      id: result.id,
      smallUrl: result.urls.small
    };
    const response: SearchResponse = { total: 2, results: [result, result] };
    const transformedResponse: SearchResultsData = { totalCount: 2, items: [transformedResult, transformedResult] };

    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'searchPhotosBySearchText').and.returnValue(Observable.of(response));
    component.searchPhotos(searchText);

    expect(component.isSearchStarted).toBe(false);
    expect(component.isSearchFinished).toBe(true);
    expect(component.isError).toBe(false);
    expect(component.searchResultsData).toEqual(transformedResponse);
  });

  it('should manage correctly errored call to AppService', () => {
    appService = fixture.debugElement.injector.get(AppService);
    spyOn(appService, 'searchPhotosBySearchText').and.returnValue(Observable.throw({ status: 500 }));
    component.searchPhotos(searchText);

    expect(component.isSearchStarted).toBe(false);
    expect(component.isSearchFinished).toBe(true);
    expect(component.isError).toBe(true);
  });

  it('should call #searchPhotos with search text on form submit', () => {
    const searchFieldElem = fixture.debugElement.query(By.css('app-search-field'));
    const searchFieldComp = searchFieldElem.injector.get(MockSearchFieldComponent);
    const spy = spyOn(component, 'searchPhotos');

    searchFieldComp.searchInput.setValue(searchText);
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);

    expect(spy).toBeCalledWith(searchText);
  });

  it('should have disabled submit form button when search input is invalid', () => {
    const searchFieldElem = fixture.debugElement.query(By.css('app-search-field'));
    const searchFieldComp = searchFieldElem.injector.get(MockSearchFieldComponent);

    searchFieldComp.searchInput.setErrors({ required: true });
    fixture.detectChanges();

    const buttonElem = fixture.debugElement.query(By.css('button')).nativeElement;

    expect(buttonElem.disabled).toBe(true);
  });
});

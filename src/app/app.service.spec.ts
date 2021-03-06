import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppService } from './app.service';
import { environment } from '../environments/environment';

describe('AppService', () => {
  let injector: TestBed;
  let service: AppService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppService]
    });

    injector = getTestBed();
    service = injector.get(AppService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // make sure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get items', () => {
    const searchResponse = { total: 0, results: [] };

    service.getItems('1', 1).subscribe(response => {
      expect(response).toEqual(searchResponse);
    });

    const req = httpMock.expectOne(req => req.method === 'GET' && req.url === `${environment.apiBase}/search/photos`);

    req.flush(searchResponse);
  });

  it('should use search text and page number as query parameters when getting items', () => {
    const searchText = 'abc';
    const pageNumber = 2;

    service.getItems(searchText, pageNumber).subscribe(() => { });

    const req = httpMock.expectOne(req => req.method === 'GET' && req.url === `${environment.apiBase}/search/photos`);

    expect(req.request.params.get('query')).toBe(searchText);
    expect(req.request.params.get('page')).toBe(pageNumber.toString());

    req.flush({});
  });
});

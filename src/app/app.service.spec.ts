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

  it('should get photos', () => {
    const photosResponse = { total: 0, results: [] };

    service.searchPhotosBySearchText(1).subscribe(response => {
      expect(response).toEqual(photosResponse);
    });

    const req = httpMock.expectOne(req => req.method === 'GET' && req.url === `${environment.apiBase}/search/photos`);

    req.flush(photosResponse);
  });

  it('should use search text as query parameter when getting photos', () => {
    const searchText = 'abc';

    service.searchPhotosBySearchText(searchText).subscribe(() => { });

    const req = httpMock.expectOne(req => req.method === 'GET' && req.url === `${environment.apiBase}/search/photos`);

    expect(req.request.params.get('query')).toBe(searchText);

    req.flush({});
  });
});

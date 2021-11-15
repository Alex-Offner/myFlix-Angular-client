import { TestBed } from '@angular/core/testing';

import { ApiDataService } from './fetch-api-data.service';

describe('FetchApiDataService', () => {
  let service: ApiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

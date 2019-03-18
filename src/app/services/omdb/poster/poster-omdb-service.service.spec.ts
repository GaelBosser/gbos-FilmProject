import { TestBed } from '@angular/core/testing';

import { PosterOmdbServiceService } from './poster-omdb-service.service';

describe('PosterOmdbServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PosterOmdbServiceService = TestBed.get(PosterOmdbServiceService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { OmdbServiceService } from './omdb-service.service';

describe('OmdbServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OmdbServiceService = TestBed.get(OmdbServiceService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { FavorieMovieService } from './favorie-movie.service';

describe('FavorieMovieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavorieMovieService = TestBed.get(FavorieMovieService);
    expect(service).toBeTruthy();
  });
});

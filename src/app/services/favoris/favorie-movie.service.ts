import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

const MOVIE_KEY = "movie_";

@Injectable({
  providedIn: 'root'
})
export class FavorieMovieService {

  addFavoriteMovie(movie: any) {
    this.storage.set(this.getMovieKey(movie.imdbID), JSON.stringify(movie));
  }
 
  removeFavoriteMovie(movie: any) {
    this.storage.remove(this.getMovieKey(movie.imdbID));
  }
 
  isFavoriteMovie(idMovie: string) {
    return this.storage.get(this.getMovieKey(idMovie));
  }
 
  toogleFavoriteMovie(movie: any) {
    this.isFavoriteMovie(movie.imdbID).then(
      isFavorite =>
        isFavorite
          ? this.removeFavoriteMovie(movie)
          : this.addFavoriteMovie(movie)
    );
  }
 
  getMovieKey(idMovie: string) {
    return MOVIE_KEY + idMovie;
  }
 
  getFavoritesMovies(): Promise<any[]> {
    return new Promise(resolve => {
      let results: any[] = [];
      this.storage
        .keys()
        .then(keys =>
          keys
            .filter(key => key.includes(MOVIE_KEY))
            .forEach(key =>
              this.storage.get(key).then(data => results.push(JSON.parse(data)))
            )
        );
      return resolve(results);
    });
  }

  constructor(private storage: Storage) {
  }
}

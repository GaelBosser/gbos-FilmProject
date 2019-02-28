
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { HttpClient } from '@angular/common/http';

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
      let results: any[] = [];
      return new Promise(resolve => { this.storage
        .keys()
        .then(keys => {
          keys.filter(key => key.includes(MOVIE_KEY)).forEach(key => results.push(this.storage.get(key).then(data => JSON.parse(data))))
          Promise.all(results).then(data => resolve(data));
        });
      });
  }
  
  constructor(private storage: Storage, private http: HttpClient) {
  }
}

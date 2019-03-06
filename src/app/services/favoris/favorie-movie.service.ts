import { BaseDetailModel } from './../../models/baseDetailModel';
import { BaseImdbModel } from './../../models/baseImdbModel';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavorieMovieService {

  private readonly MOVIE_KEY: string = "movie_";
  
  constructor(private storage: Storage, private http: HttpClient) {
  }

  addFavoriteMovie(movie: BaseImdbModel) {
    this.storage.set(this.getMovieKey(movie.imdbID), JSON.stringify(movie));
  }
 
  removeFavoriteMovie(movie: BaseImdbModel) {
    this.storage.remove(this.getMovieKey(movie.imdbID));
  }
 
  isFavoriteMovie(idMovie: string) {
    return this.storage.get(this.getMovieKey(idMovie));
  }
 
  toogleFavoriteMovie(movie: BaseImdbModel) {
    this.isFavoriteMovie(movie.imdbID).then(
      isFavorite =>
        isFavorite
          ? this.removeFavoriteMovie(movie)
          : this.addFavoriteMovie(movie)
    );
  }
 
  private getMovieKey(idMovie: string) {
    return this.MOVIE_KEY + idMovie;
  }
 
  getFavoritesMovies(): Promise<BaseDetailModel[]> {
    return new Promise(resolve => {
      let results: BaseDetailModel[] = [];
      this.storage.keys().then(keys => keys.filter(key => key.includes(this.MOVIE_KEY)).forEach(key => this.storage.get(key)
          .then(data => results.push(JSON.parse(data)))));
      return resolve(results);
    });
  }
}

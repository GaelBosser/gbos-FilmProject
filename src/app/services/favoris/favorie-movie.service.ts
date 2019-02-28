
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  constructor(private storage: Storage, private http: HttpClient) {
  }
}

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const apiUrl = "http://www.omdbapi.com/?apikey=75522b56";

@Injectable({
  providedIn: 'root'
})
export class OmdbServiceService {

  constructor(private http: HttpClient) { }

  getByTitle(title: string, type: string, page: number): Observable<any> {
    const url = `${apiUrl}&s=${title}&type=${type}&page=${page}`;
    //console.log(url);
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  
  getDetailMovieById(id: string, plot: string): Observable<any> {
    const url = `${apiUrl}&i=${id}&plot=${plot}`;
    //console.log(url);
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError));
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
}

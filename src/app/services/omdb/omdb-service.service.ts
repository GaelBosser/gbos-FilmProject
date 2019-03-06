import { TypeMovie } from 'src/app/models/typeMovie/typeMovie';
import { Saison } from './../../models/serie/saison';
import { Search } from './../../models/search/search';
import { BaseDetailModel } from './../../models/baseDetailModel';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Episode } from 'src/app/models/serie/episode';

@Injectable({
  providedIn: 'root'
})
export class OmdbServiceService {

  private readonly apiUrl: string = "http://www.omdbapi.com/?apikey=75522b56";

  constructor(private http: HttpClient) { }

  getByTitle(title: string, type: TypeMovie, page: number): Observable<Search> {
    const url = `${this.apiUrl}&s=${title}&type=${type}&page=${page}`;
    return this.http.get(url).pipe(map((searchMovie: Search) => searchMovie));
  }
  
  getDetailMovieById(id: string, plot: string): Observable<BaseDetailModel> {
    const url = `${this.apiUrl}&i=${id}&plot=${plot}`;
    return this.http.get(url).pipe(map((detailMovie: BaseDetailModel) => detailMovie));
  }

  getSeasonById(id: string, idSeason: string): Observable<Saison> {
    const url = `${this.apiUrl}&i=${id}&Season=${idSeason}`;
    return this.http.get(url).pipe(map((detailSaison: Saison) => detailSaison));
  }

  getEpisodeById(id: string, idSeason: string, idEpisode: string): Observable<Episode> {
    const url = `${this.apiUrl}&i=${id}&Season=${idSeason}&Episode=${idEpisode}`;
    return this.http.get(url).pipe(map((detailEpisode: Episode) => detailEpisode));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}

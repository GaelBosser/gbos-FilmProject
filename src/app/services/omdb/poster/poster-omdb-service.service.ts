import { AccessApiOmdbConstantes } from './../../../constantes/accessApiOmdbConstantes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PosterOmdbServiceService {

  private readonly accessApi: AccessApiOmdbConstantes = AccessApiOmdbConstantes.getInstance();
  private readonly apiPosterUrl: string = "http://img.omdbapi.com/?apikey=" + this.accessApi.ApiKeyValue;

  constructor(private http: HttpClient) { }

  getPosterById(id: string): Observable<Blob> {
    const url = `${this.apiPosterUrl}&i=${id}&h=700`;
    return this.http.get(url, { responseType: 'blob' });
  }
}

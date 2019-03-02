import { BasePage } from './../basePage';
import { ResponseAPI } from './../../models/ResponseAPI/responseAPI';
import { BaseImdbModel } from './../../models/baseImdbModel';
import { Search } from './../../models/search/search';
import { AlertType } from './../../utils/displayAlertUtils';
import { Component, OnInit } from '@angular/core';
import { OmdbServiceService } from '../../services/omdb/omdb-service.service';
import { TypeMovie } from 'src/app/models/typeMovie/typeMovie';

@Component({
  selector: 'app-film',
  templateUrl: './film.page.html',
  styleUrls: ['./film.page.scss'],
})
export class FilmPage extends BasePage implements OnInit {
  searchFilmBool: boolean;
  searchFilm: string;
  lastSearchFilm: string;
  filmIntrouvable: boolean;
  data : Search;
  films: Array<BaseImdbModel>;
  page: number;
  displaySearchBar: boolean;
  endInfiniteScroll: boolean;

  constructor(private api: OmdbServiceService) {
    super()
    this.films = new Array<BaseImdbModel>();
    this.page = 1;
    this.displaySearchBar = true;
    this.titlePage = "Liste de films";
  }

  ngOnInit() {
  }

  async getFilmSearchBar() {
    await this.api.getByTitle(this.searchFilm.trim(), TypeMovie.Movie, this.page)
      .subscribe(res => {
        this.data = res;
        this.updateLastSearchedMovie();
        this.responseSearchApi(res);
      }, err => this.displayAlert.presentAlert(AlertType.Alert, "", err));
  }

  responseSearchApi(res: Search): void{
    if(res.Response == ResponseAPI.False){
      this.filmIntrouvable = true;
      this.films = [];
    }
    else{
      this.filmIntrouvable = false;
      for(let i=0; i<this.data.Search.length; i++){
        this.films.push(this.data.Search[i]);
      }
    }
  }

  updateLastSearchedMovie(): void{
    if(this.lastSearchFilm != this.searchFilm){
      this.films = [];
      this.lastSearchFilm = this.searchFilm;
      this.endInfiniteScroll = false;
    }
    if(this.searchFilm.trim() == "")
      this.searchFilmBool = false;
    else
      this.searchFilmBool = true;
  }

  searchbarEventClick(event: EventSource) {
    this.displaySearchBar = !this.displaySearchBar;
  }

  doInfinite(infiniteScroll: any): Promise<any> {
    return new Promise((resolve) => { 
      setTimeout(() => {
        if(this.films.length < parseInt(this.data.totalResults)){
          this.page++;
          this.getFilmSearchBar();
        }
        else
          this.endInfiniteScroll = true;
        resolve();
        infiniteScroll.target.complete();
      }, 500);
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { OmdbServiceService } from '../../services/omdb/omdb-service.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.page.html',
  styleUrls: ['./film.page.scss'],
})
export class FilmPage implements OnInit {

  searchFilmBool: boolean;
  searchFilm: string;
  lastSearchFilm: string;
  filmIntrouvable: boolean;
  data : any;
  films = [];
  page: number = 1;
  type: string = "movie";
  displaySearchBar: boolean = true;

  async getFilmSearchBar() {
    await this.api.getByTitle(this.searchFilm.trim(), this.type, this.page)
      .subscribe(res => {
        this.data = res;
        
        if(this.lastSearchFilm != this.searchFilm)
        {
          this.films = [];
        }

        if(res.Response == "False")
        {
          this.filmIntrouvable = true;
          this.films = [];
        }
        else
        {
          this.filmIntrouvable = false;
          for(let i=0; i<this.data.Search.length; i++)
          {
            this.films.push(this.data.Search[i]);
          }
        }
        if(this.searchFilm.trim() == "")
        {
          this.searchFilmBool = false;
        } 
        else
        {
          this.searchFilmBool = true;
        }

        this.lastSearchFilm = this.searchFilm;
      }, err => {
        console.log(err);
      });
  }

  searchbarEventClick(event) {
    this.displaySearchBar = !this.displaySearchBar;
  }

  doInfinite(infiniteScroll): Promise<any> {
    //console.log('Begin async operation');
    return new Promise((resolve) => {
      setTimeout(() => {
        this.page++;
      this.getFilmSearchBar();

        //console.log('Async operation has ended');
        resolve();
        infiniteScroll.target.complete();
      }, 500);
    })
  }

  constructor(public api: OmdbServiceService) { }

  ngOnInit() {}
}
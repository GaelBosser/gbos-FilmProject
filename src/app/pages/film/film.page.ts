import { Component, OnInit } from '@angular/core';
import { OmdbServiceService } from '../../services/omdb/omdb-service.service';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-film',
  templateUrl: './film.page.html',
  styleUrls: ['./film.page.scss'],
})
export class FilmPage implements OnInit {

  searchFilmBool: boolean;
  searchFilm: string;
  films: any;
  page: number = 1;
  selectedPage: number;
  pages: any[] = [ 
    { Number: '1'}, 
    { Number: '2' }
    ]; 

  async getFilmSearchBar() {
    await this.api.getFilmBySearchTitle(this.searchFilm, this.page)
      .subscribe(res => {
        console.log(res);
        this.films = res;
        if(this.searchFilm.trim() == "")
        {
          this.searchFilmBool = false;
        }
        else
        {
          this.searchFilmBool = true;
        }
      }, err => {
        console.log(err);
      });
  }

  constructor(public api: OmdbServiceService) { }

  ngOnInit() {
    this.searchFilmBool = false;
    this.selectedPage = this.pages[0].Number;
    console.log(this.selectedPage);
  }
}
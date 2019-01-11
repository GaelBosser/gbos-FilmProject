import { Component, OnInit } from '@angular/core';

import { OmdbServiceService } from '../omdb-service.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.page.html',
  styleUrls: ['./film.page.scss'],
})
export class FilmPage implements OnInit {

  film: any = {};

  async getFilm() {
    await this.api.getFilmByTitle("Harry Potter and the Deathly Hallows: Part 2")
      .subscribe(res => {
        console.log(res);
        this.film = res;
      }, err => {
        console.log(err);
      });
  }

  constructor(public api: OmdbServiceService) { }

  ngOnInit() {
    this.getFilm();
  }
}
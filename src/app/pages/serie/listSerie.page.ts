import { Serie } from './../../models/serie/serie';
import { BaseListPage } from './../baseListPage';
import { Component, OnInit } from '@angular/core';
import { OmdbServiceService } from '../../services/omdb/omdb-service.service';
import { TypeMovie } from 'src/app/models/typeMovie/typeMovie';

@Component({
  selector: 'app-serie',
  templateUrl: './listSerie.page.html',
  styleUrls: ['./listSerie.page.scss'],
})
export class ListSeriePage extends BaseListPage implements OnInit {

  typeMovie: TypeMovie;

  constructor(protected api: OmdbServiceService) {
    super(api)
    this.typeMovie = TypeMovie.Series;
    this.titlePage = "Liste de séries";
  }

  ngOnInit(){
  }
}

import { BaseDetailPage } from './../baseDetailPage';
import { Plot } from './../../models/baseDetailModel';
import { FavorieMovieService } from './../../services/favoris/favorie-movie.service';
import { OmdbServiceService } from '../../services/omdb/omdb-service.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage extends BaseDetailPage {

  detailsMovie: any;
  plot: Plot;
  numberSeasonArray: Array<number>;
  isFavorite: boolean;
  
  constructor(protected api: OmdbServiceService, protected route: ActivatedRoute, protected navCtrl: NavController, 
    protected favoriteMovieService: FavorieMovieService) {
      super(api, route, navCtrl)
      this.plot = Plot.Full;
      this.numberSeasonArray = new Array<number>();
      this.isFavorite = false;
      this.titlePage = "Fiche détails";
    }

  ngOnInit() {
    super.ngOnInit();
  }

  ionViewWillEnter(){
    this.getDetailMovie();
  }

  ionViewDidEnter(){
    this.favoriteMovieService.isFavoriteMovie(this.id).then(value => (this.isFavorite = value))
      .catch(err => this.displayAlert.presentAlert("Alert", "", err));
  }

  async getDetailMovie() {
    await this.api.getDetailMovieById(this.id, this.plot)
    .subscribe(res => {
      this.detailsMovie = res;
      if(this.detailsMovie.Type == "series" && this.numberSeasonArray.length == 0){
        for(let i = 1; i <= parseInt(this.detailsMovie.totalSeasons); i++){
          this.numberSeasonArray.push(i);
        }
      }
    }, err => this.displayAlert.presentAlert("Alert", "", err));
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.favoriteMovieService.toogleFavoriteMovie(this.detailsMovie);
  }
}
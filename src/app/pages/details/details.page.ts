import { TypeMovie } from 'src/app/models/typeMovie/typeMovie';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AlertType } from './../../utils/displayAlertUtils';
import { BaseDetailPage } from './../baseDetailPage';
import { Plot, BaseDetailModel } from './../../models/baseDetailModel';
import { FavorieMovieService } from './../../services/favoris/favorie-movie.service';
import { OmdbServiceService } from '../../services/omdb/omdb-service.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

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
    protected favoriteMovieService: FavorieMovieService, protected loadingController: LoadingController,
    protected socialSharing: SocialSharing) {
    super(api, route, navCtrl, loadingController, socialSharing)
    this.plot = Plot.Full;
    this.numberSeasonArray = new Array<number>();
    this.isFavorite = false;
    this.titlePage = "Fiche détails";
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ionViewWillEnter() {
    this.getDetailMovie();
  }

  ionViewDidEnter() {
    this.favoriteMovieService.isFavoriteMovie(this.id).then(value => (this.isFavorite = value))
      .catch(err => this.displayAlert.presentAlert(AlertType.Erreur, "", "Une erreur est survenue"));
  }

  async getDetailMovie() {
    await this.presentLoading();
    await this.api.getDetailMovieById(this.id, this.plot)
      .subscribe(res => {
        this.detailsMovie = res;
        if (this.detailsMovie.Type == "series" && this.numberSeasonArray.length == 0) {
          for (let i = 1; i <= parseInt(this.detailsMovie.totalSeasons); i++) {
            this.numberSeasonArray.push(i);
          }
        }
      }, err => this.displayAlert.presentAlert(AlertType.Erreur, "", "Une erreur est survenue durant l'appel au serveur"));
    await this.dismissLoading();
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.favoriteMovieService.toogleFavoriteMovie(this.detailsMovie);
  }

  shareMovieEvent(){
    let detailMovieModel: BaseDetailModel = this.detailsMovie;
    let message: string = "Regarde cette pépite, ça vaut le coup d'être regardé : " + detailMovieModel.Title;
    let subject: string = null;
    let file: string | string[] = null;
    let url: string = null;
    this.shareMovie(message, subject, file, url);
  }
}
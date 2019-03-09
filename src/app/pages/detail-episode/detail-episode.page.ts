import { Saison } from './../../models/serie/saison';
import { BaseDetailPage } from './../baseDetailPage';
import { OmdbServiceService } from '../../services/omdb/omdb-service.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { FavorieMovieService } from './../../services/favoris/favorie-movie.service';
import { Episode } from 'src/app/models/serie/episode';
import { isUndefined } from 'util';

@Component({
  selector: 'app-detail-episode',
  templateUrl: './detail-episode.page.html',
  styleUrls: ['./detail-episode.page.scss'],
})
export class DetailEpisodePage extends BaseDetailPage {

  idSeason: string;
  idEpisode: string;
  detailEpisode: Episode;
  detailSeason: Saison;
  isFavorite: boolean;

  constructor(protected api: OmdbServiceService, protected route: ActivatedRoute, protected navCtrl: NavController,
    private favoriteMovieService: FavorieMovieService, protected loadingController: LoadingController) {
    super(api, route, navCtrl, loadingController)
    this.isFavorite = false;
  }

  ngOnInit() {
    super.ngOnInit();
    this.idSeason = this.route.snapshot.paramMap.get('idSeason');
    this.idEpisode = this.route.snapshot.paramMap.get('idEpisode');
  }

  ionViewWillEnter() {
    this.getDetailSeason();
    this.getDetailEpisode();
  }

  ionViewDidEnter() {
    this.favoriteMovieService.isFavoriteMovie(this.detailEpisode.imdbID).then(value => (this.isFavorite = value))
      .catch(err => this.displayAlert.presentAlert("Alert", "", err));
  }

  async getDetailSeason() {
    await this.presentLoading();
    await this.api.getSeasonById(this.id, this.idSeason)
      .subscribe(res => {
        this.detailSeason = res;
      }, err => this.displayAlert.presentAlert("Alert", "", err));
    await this.dismissLoading();
  }

  async getDetailEpisode() {
    await this.presentLoading();
    await this.api.getEpisodeById(this.id, this.idSeason, this.idEpisode)
      .subscribe(res => {
        this.detailEpisode = res;
        this.setTitlePage();
      }, err => this.displayAlert.presentAlert("Alert", "", err));
    await this.dismissLoading();
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.favoriteMovieService.toogleFavoriteMovie(this.detailEpisode);
  }

  setTitlePage() {
    this.titlePage = `Détail série ${this.detailSeason.Title} Saison ${this.detailSeason.Season} Épisode ${this.detailEpisode.Episode}`;
  }
}
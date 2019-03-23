import { AlertType } from './../../utils/displayAlertUtils';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Saison } from './../../models/serie/saison';
import { BaseDetailPage } from './../baseDetailPage';
import { OmdbServiceService } from '../../services/omdb/omdb-service.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, AlertController, ActionSheetController } from '@ionic/angular';
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
    private favoriteMovieService: FavorieMovieService, protected loadingController: LoadingController,
    protected socialSharing: SocialSharing, protected alertController: AlertController, protected actionSheetController: ActionSheetController) {
    super(api, route, navCtrl, loadingController, socialSharing, alertController, actionSheetController)
    this.isFavorite = false;
  }

  ngOnInit() {
    super.ngOnInit();
    this.idSeason = this.route.snapshot.paramMap.get('idSeason');
    this.idEpisode = this.route.snapshot.paramMap.get('idEpisode');
  }

  async ionViewWillEnter() {
    await this.presentLoading();
    this.getDetailSeason();
    this.getDetailEpisode().then(result => this.checkIsFavoriteMovie());
    await this.dismissLoading();
  }

  private checkIsFavoriteMovie() {
    if (this.detailEpisode && !isUndefined(this.detailEpisode.imdbID)) {
      this.favoriteMovieService.isFavoriteMovie(this.detailEpisode.imdbID).then(value => (this.isFavorite = value))
        .catch(err => this.displayAlert.presentAlert(AlertType.Erreur, "", "Une erreur est survenue pendant la récupération de l'état de l'épisode"));
    }
  }

  async getDetailSeason() {
    await this.api.getSeasonById(this.id, this.idSeason)
      .subscribe(res => {
        this.detailSeason = res;
      }, err => this.displayAlert.presentAlert(AlertType.Erreur, "", "Une erreur est survenue lors de la récupération du détail de la saison"));
  }

  async getDetailEpisode() {
    await this.api.getEpisodeById(this.id, this.idSeason, this.idEpisode)
      .subscribe(res => {
        this.detailEpisode = res;
        this.setTitlePage();
      }, err => this.displayAlert.presentAlert(AlertType.Erreur, "", "Une erreur est survenue lors de la récupération du détail de l'épisode"));
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.favoriteMovieService.toogleFavoriteMovie(this.detailEpisode);
  }

  setTitlePage() {
    this.titlePage = `Détail série ${this.detailSeason.Title} Saison ${this.detailSeason.Season} Épisode ${this.detailEpisode.Episode}`;
  }

  shareEpisodeEvent() {
    let message: string = "Regarde cette pépite, ça vaut le coup d'être regardé : " +
      `${this.detailSeason.Title} Saison ${this.detailSeason.Season} Épisode ${this.detailEpisode.Episode} : ${this.detailEpisode.Title}`;
    let subject: string = null;
    let file: string | string[] = null;
    let url: string = null;
    this.shareMovie(message, subject, file, url);
  }
}
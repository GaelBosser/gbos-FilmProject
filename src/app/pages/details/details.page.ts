import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { BaseImdbModel } from './../../models/baseImdbModel';
import { PosterOmdbServiceService } from './../../services/omdb/poster/poster-omdb-service.service';
import { TypeMovie } from 'src/app/models/typeMovie/typeMovie';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AlertType } from './../../utils/displayAlertUtils';
import { BaseDetailPage } from './../baseDetailPage';
import { Plot, BaseDetailModel } from './../../models/baseDetailModel';
import { FavorieMovieService } from './../../services/favoris/favorie-movie.service';
import { OmdbServiceService } from '../../services/omdb/omdb-service.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';

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
  listActeurs: Array<string>;
  imageToShow: any;
  imagePosterVisible: boolean;

  constructor(protected api: OmdbServiceService, protected route: ActivatedRoute, protected navCtrl: NavController,
    protected favoriteMovieService: FavorieMovieService, protected loadingController: LoadingController,
    protected socialSharing: SocialSharing, protected apiPoster: PosterOmdbServiceService, private platform: Platform,
    private transfer: FileTransfer, private file: File, private posterApi: PosterOmdbServiceService) {
    super(api, route, navCtrl, loadingController, socialSharing)
    this.plot = Plot.Full;
    this.numberSeasonArray = new Array<number>();
    this.isFavorite = false;
    this.titlePage = "Fiche détails";
    this.listActeurs = new Array<string>();
  }



  private createImageFromBlob(image: Blob) {
    var reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      this.imageToShow = reader.result
    }
  }

  getImageFromService() {
    let detailsMovieImdbModel: BaseImdbModel = this.detailsMovie;
    this.apiPoster.getPosterById(detailsMovieImdbModel.imdbID).subscribe(data => {
      this.createImageFromBlob(data);
      this.imagePosterVisible = true;
    }, error => {
      this.imagePosterVisible = false;
    });
  }

  downloadPosterEvent() {
    if (this.platform.is('android')) {
      if (this.imageToShow != this.constantesValueApi.defaultFieldUndefinedValue) {
        const fileTransfer: FileTransferObject = this.transfer.create();
        let url: string = this.posterApi.getUrlPoster(this.id);
        let mediasDetail: BaseDetailModel = this.detailsMovie;
        fileTransfer.download(url, this.file.externalDataDirectory + mediasDetail.Title + '.jpg').then((entry) => {
          this.displayAlert.presentAlert(AlertType.Succes, "Téléchargement terminé", "Chemin du fichier : " + entry.toURL());
        }, (error) => {
          this.displayAlert.presentAlert(AlertType.Erreur, "", "Une erreur est survenue lors du téléchargement du poster")
        });
      }
    }
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
        this.setSeasonArray();
        this.setActorsArray();
        this.getImageFromService();
      }, err => this.displayAlert.presentAlert(AlertType.Erreur, "", "Une erreur est survenue durant l'appel au serveur"));
    await this.dismissLoading();
  }

  private setSeasonArray(): void {
    if (this.detailsMovie.Type == TypeMovie.Series && this.numberSeasonArray.length == 0) {
      for (let i = 1; i <= parseInt(this.detailsMovie.totalSeasons); i++) {
        this.numberSeasonArray.push(i);
      }
    }
  }

  private setActorsArray(): void {
    let detailsMovieModel: BaseDetailModel = this.detailsMovie;
    if (detailsMovieModel.Actors == this.constantesValueApi.defaultFieldUndefinedValue) {
      this.listActeurs == null;
    }
    else {
      this.listActeurs = detailsMovieModel.Actors.split(", ", detailsMovieModel.Actors.split(",").length);
    }
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.favoriteMovieService.toogleFavoriteMovie(this.detailsMovie);
  }

  shareMovieEvent() {
    let detailMovieModel: BaseDetailModel = this.detailsMovie;
    let message: string = "Regarde cette pépite, ça vaut le coup d'être regardé : " + detailMovieModel.Title;
    let subject: string = null;
    let file: string | string[] = null;
    let url: string = null;
    this.shareMovie(message, subject, file, url);
  }
}
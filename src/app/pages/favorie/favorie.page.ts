import { BaseImdbModel } from './../../models/baseImdbModel';
import { AlertType } from './../../utils/displayAlertUtils';
import { BaseDetailModel } from './../../models/baseDetailModel';
import { BasePage } from './../basePage';
import { ConvertorUtils } from './../../utils/ConvertorUtils';
import { FavorieMovieService } from './../../services/favoris/favorie-movie.service';
import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { TypeMovie } from 'src/app/models/typeMovie/typeMovie';
import { OmdbServiceService } from 'src/app/services/omdb/omdb-service.service';

@Component({
  selector: 'app-favorie',
  templateUrl: './favorie.page.html',
  styleUrls: ['./favorie.page.scss'],
})
export class FavoriePage extends BasePage {

  favoriteMovies: Array<BaseDetailModel>;
  filePath: string;
  fileName: string;
  converteur: ConvertorUtils;

  constructor(private favorieMovieService: FavorieMovieService, private navCtrl: NavController, private file: File,
    private platform: Platform, private fileChooser: FileChooser, private api: OmdbServiceService) {
    super()
    this.converteur = new ConvertorUtils();
    this.favoriteMovies = new Array<BaseDetailModel>();
    this.titlePage = "Liste de favoris";
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ionViewWillEnter() {
    this.initFavoriteMovies();
  }

  ionRefresh(event: any) {
    setTimeout(() => {
      this.initFavoriteMovies();
      event.target.complete();
    }, 2000);
  }

  navigateToDetail(movie: any) {
    if (movie.Type == TypeMovie.Episodes) {
      this.navCtrl.navigateForward('/detail/' + movie.seriesID + '/season/' + movie.Season + '/episode/' + movie.Episode);
    }
    else {
      this.navCtrl.navigateForward('/detail/' + movie.imdbID);
    }
  }

  initFavoriteMovies() {
    this.favorieMovieService.getImdbFavoritesMovies().then(favs => {
      this.favoriteMovies = favs;
    }).catch(e => this.displayAlert.presentAlert(AlertType.Erreur, "", "Une erreur est survenue durant l'appel au serveur."));
  }

  async presentActionSheetExport() {
    this.displayAlert.presentActionSheet("Export des favoris", [{
      text: 'JSON',
      role: 'exportJson',
      icon: 'document',
      handler: () => {
        this.exportJSONFavorite();
      }
    },
    {
      text: 'CSV',
      icon: 'bookmarks',
      handler: () => {
        this.exportCSVFavorite();
      }
    }]);
  }

  async presentActionSheetImport() {
    this.displayAlert.presentActionSheet("Import des favoris", [{
      text: 'JSON',
      role: 'importJson',
      icon: 'document',
      handler: () => {
        this.importJSONFavorite();
      }
    },
    {
      text: 'CSV',
      role: 'importCSV',
      icon: 'bookmarks',
      handler: () => {
        this.importCSVFavorite();
      }
    }]);
  }

  async importJSONFavorite() {
    if (this.platform.is('android')) {
      this.fileChooser.open().then(uri => {
        this.filePath = uri.toString()
        this.file.resolveLocalFilesystemUrl(this.filePath).then(data => {
          this.fileName = data.name
          this.filePath = this.filePath.replace(this.fileName, "");
          this.file.readAsText(this.filePath, this.fileName).then(favoris => {
            this.favoriteMovies = JSON.parse(favoris)
            for (let i = 0; i < this.favoriteMovies.length; i++) {
              this.favorieMovieService.addFavoriteMovie(this.favoriteMovies[i]);
            }
            this.displayAlert.presentAlert(AlertType.Succes, "Favoris importé", "Tous les favoris du fichier " +
              this.fileName + " ont été importés");
          }).catch(e => this.displayAlert.presentAlert(AlertType.Erreur, "", "Un problème est survenu à la récupération des favoris"));
        });
      }).catch(e => this.displayAlert.presentAlert(AlertType.Alert, "", e));
    }
  }

  async importCSVFavorite() {
    if (this.platform.is('android')) {
      this.fileChooser.open().then(uri => {
        this.filePath = uri.toString()
        this.file.resolveLocalFilesystemUrl(this.filePath).then(data => {
          this.fileName = data.name;
          this.filePath = this.filePath.replace(this.fileName, "");
          this.file.readAsText(this.filePath, this.fileName).then(favsToImport => {
            this.favoriteMovies = JSON.parse(this.converteur.CSVToJsonConvertor(favsToImport));
            for (let i = 0; i < this.favoriteMovies.length; i++) {
              this.favorieMovieService.addFavoriteMovie(this.favoriteMovies[i]);
            }
            this.displayAlert.presentAlert(AlertType.Succes, "Favoris importé", "Tous les favoris du fichier " +
              this.fileName + " ont été importés");
          })
        }).catch(e => this.displayAlert.presentAlert(AlertType.Erreur, "", "Une erreur est survenu lors de la lecture du fichier CSV"));
      }).catch(e => this.displayAlert.presentAlert(AlertType.Erreur, "", "Une erreur est survenu lors de l'import des favoris en CSV"));;
    }
  }

  async exportJSONFavorite() {
    if (this.platform.is('android')) {
      if (this.favoriteMovies.length == 0) {
        await this.displayAlert.presentAlert(AlertType.Alert, "", "Vous n'avez aucun favoris à exporter.");
      }
      else {
        this.filePath = this.file.externalDataDirectory;
        let dateFichier: Date = new Date();
        this.fileName = "Favoris" + dateFichier.getFullYear() + dateFichier.getMonth() + dateFichier.getDay() + dateFichier.getHours() +
          dateFichier.getMinutes() + dateFichier.getSeconds() + dateFichier.getMilliseconds() + ".json";

        let favorisToExportJson: Array<BaseImdbModel> = this.favoriteMovies.map(filtre => <BaseImdbModel>{
          imdbID: filtre.imdbID,
          Title: filtre.Title
        });

        this.file.writeFile(this.filePath, this.fileName, JSON.stringify(favorisToExportJson), { replace: true }).then(success =>
          this.displayAlert.presentAlert(AlertType.Succes, "Favoris exporté", "Chemin du fichier : " + this.filePath + this.fileName))
          .catch(e => this.displayAlert.presentAlert(AlertType.Erreur, "", "Un problème est survenu durant l'export JSON des favoris"));
      }
    }
  }

  async exportCSVFavorite() {
    if (this.platform.is('android')) {
      if (this.favoriteMovies.length == 0) {
        await this.displayAlert.presentAlert(AlertType.Alert, "", "Vous n'avez aucun favoris à exporter.");
      }
      else {
        this.filePath = this.file.externalDataDirectory;
        let dateFichier: Date = new Date();
        this.fileName = "FavorisCSV" + dateFichier.getFullYear() + dateFichier.getMonth() + dateFichier.getDay() + dateFichier.getHours() +
          dateFichier.getMinutes() + dateFichier.getSeconds() + dateFichier.getMilliseconds() + ".csv";

        let favorisToExportCsv: Array<BaseImdbModel> = this.favoriteMovies.map(filtre => <BaseImdbModel>{
          imdbID: filtre.imdbID,
          Title: filtre.Title
        });

        this.file.writeFile(this.filePath, this.fileName, this.converteur.JSONToCSVConvertor(favorisToExportCsv, true),
          { replace: true }).then(success =>
            this.displayAlert.presentAlert(AlertType.Succes, "Favoris exporté", "Chemin du fichier : " + this.filePath + this.fileName))
          .catch(e => this.displayAlert.presentAlert(AlertType.Erreur, "", "Un problème est survenu durant l'export CSV des favoris"));
      }
    }
  }
}
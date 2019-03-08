import { BaseImdbModel } from './../../models/baseImdbModel';
import { AlertType } from './../../utils/displayAlertUtils';
import { BaseDetailModel } from './../../models/baseDetailModel';
import { BasePage } from './../basePage';
import { ConvertorUtils } from './../../utils/ConvertorUtils';
import { FavorieMovieService } from './../../services/favoris/favorie-movie.service';
import { Component } from '@angular/core';
import { NavController, Platform, IonDatetime } from '@ionic/angular';
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

  navigateToDetail(idMovie: string) {
    this.navCtrl.navigateForward('/detail/' + idMovie);
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
        this.exportFavoris('JSON');
      }
    },
    {
      text: 'CSV',
      icon: 'bookmarks',
      handler: () => {
        this.exportFavoris('CSV');
      }
    }]);
  }

  async presentActionSheetImport() {
    this.displayAlert.presentActionSheet("Import des favoris", [{
      text: 'JSON',
      role: 'importJson',
      icon: 'document',
      handler: () => {
        this.importFavoris('JSON');
      }
    },
    {
      text: 'CSV',
      role: 'importCSV',
      icon: 'bookmarks',
      handler: () => {
        this.importFavoris('CSV');
      }
    }]);
  }

  async importFavoris(typeImport: string) {
    if (this.platform.is('android')) {
      this.fileChooser.open().then(uri => {
        this.filePath = uri.toString()
        this.file.resolveLocalFilesystemUrl(this.filePath).then(data => {
          this.fileName = data.name
          this.filePath = this.filePath.replace(this.fileName, "");
          this.file.readAsText(this.filePath, this.fileName).then(favoris => {

            if (typeImport.toUpperCase().trim() == 'JSON')
              this.favoriteMovies = JSON.parse(favoris)
            else if (typeImport.toUpperCase().trim() == 'CSV')
              this.favoriteMovies = JSON.parse(this.converteur.CSVToJsonConvertor(favoris));

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

  async exportFavoris(typeExport: string) {
    if (this.platform.is('android')) {
      if (this.favoriteMovies.length == 0) {
        await this.displayAlert.presentAlert(AlertType.Alert, "", "Vous n'avez aucun favoris à exporter.");
      }
      else {
        this.filePath = this.file.externalDataDirectory;
        let dateMillisecondes: number = new Date().getTime();
        this.fileName = "Favoris" + dateMillisecondes + "." + typeExport.toLowerCase().trim();

        let favorisToExport: Array<BaseImdbModel> = this.favoriteMovies.map(filtre => <BaseImdbModel>{
          imdbID: filtre.imdbID,
          Title: filtre.Title,
          Type: filtre.Type
        });

        console.log(favorisToExport);

        let strToExport: string;
        if (typeExport.toUpperCase().trim() == 'JSON')
          strToExport = JSON.stringify(favorisToExport);
        else if (typeExport.toUpperCase().trim() == 'CSV')
          strToExport = this.converteur.JSONToCSVConvertor(favorisToExport, true);

        console.log(strToExport);
        this.file.writeFile(this.filePath, this.fileName, strToExport, { replace: true }).then(success =>
          this.displayAlert.presentAlert(AlertType.Succes, "Favoris exporté", "Chemin du fichier : " + this.filePath + this.fileName))
          .catch(e => this.displayAlert.presentAlert(AlertType.Erreur, "", "Un problème est survenu durant l'export JSON des favoris"));
      }
    }
  }
}
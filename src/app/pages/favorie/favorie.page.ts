import { DisplayAlertUtils } from './../../utils/DisplayAlertUtils';
import { ConvertorUtils } from './../../utils/ConvertorUtils';
import { FavorieMovieService } from './../../services/favoris/favorie-movie.service';
import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

@Component({
  selector: 'app-favorie',
  templateUrl: './favorie.page.html',
  styleUrls: ['./favorie.page.scss'],
})
export class FavoriePage implements OnInit {

  favoriteMovies: any;
  filePath: string;
  fileName: string;
  displayAlert: DisplayAlertUtils;
  converteur: ConvertorUtils;

  constructor(private favorieMovieService: FavorieMovieService, private navCtrl: NavController, 
    private file: File, private platform: Platform, private fileChooser: FileChooser) {
      this.displayAlert = new DisplayAlertUtils();
      this.converteur = new ConvertorUtils();
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

  navigateToDetail(movie: any){
    if(movie.Type == "episode"){
      this.navCtrl.navigateForward('/detail/' + movie.seriesID + '/season/' + movie.Season + '/episode/' + movie.Episode);
    }
    else{
      this.navCtrl.navigateForward('/detail/' + movie.imdbID);
    }
  }

  initFavoriteMovies() {
    this.favorieMovieService.getFavoritesMovies().then(favs => { 
      this.favoriteMovies = favs;
    }).catch(e => this.displayAlert.presentAlert("Alerte", "", e));
  }

  async importFavorite() {
    if(this.platform.is('android'))
    {
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
            this.displayAlert.presentAlert("Succès", "Favoris importé", "Tous les favoris du fichier " + 
              this.fileName + " ont été importés");
          }).catch(e => this.displayAlert.presentAlert("Erreur", "", "Un problème est survenu à la récupération des favoris"));
        });
      }).catch(e => this.displayAlert.presentAlert("Alerte", "", e));
    }
  }

  async exportFavorite() {
    if(this.platform.is('android'))
    {
      if(this.favoriteMovies.length == 0){
        await this.displayAlert.presentAlert("Alerte", "", "Vous n'avez aucun favoris à exporter.");
      }
      else{
        this.filePath = this.file.externalDataDirectory;
        let dateFichier: Date = new Date();
        this.fileName = "Favoris" + dateFichier.getFullYear() + dateFichier.getMonth() + dateFichier.getDay() + dateFichier.getHours() +
          dateFichier.getMinutes() + dateFichier.getSeconds() + dateFichier.getMilliseconds() + ".json";
        
        this.file.writeFile(this.filePath, this.fileName, JSON.stringify(this.favoriteMovies), {replace: true}).then(success => 
          this.displayAlert.presentAlert("Succès", "Favoris exporté", "Chemin du fichier : " + this.filePath + this.fileName))
          .catch(e => this.displayAlert.presentAlert("Erreur", "", "Un problème est survenu durant l'export des favoris"));
      }
    }
  }

  async exportCsvFavorite() {
    if(this.platform.is('android'))
    {
      if(this.favoriteMovies.length == 0){
        await this.displayAlert.presentAlert("Alerte", "", "Vous n'avez aucun favoris à exporter.");
      }
      else{
        this.filePath = this.file.externalDataDirectory;
        let dateFichier: Date = new Date();
        this.fileName = "FavorisCSV" + dateFichier.getFullYear() + dateFichier.getMonth() + dateFichier.getDay() + dateFichier.getHours() +
          dateFichier.getMinutes() + dateFichier.getSeconds() + dateFichier.getMilliseconds() + ".csv";

        this.file.writeFile(this.filePath, this.fileName, this.converteur.JSONToCSVConvertor(this.favoriteMovies, true), 
          {replace: true}).then(success => 
          this.displayAlert.presentAlert("Succès", "Favoris exporté", "Chemin du fichier : " + this.filePath + this.fileName))
          .catch(e => this.displayAlert.presentAlert("Erreur", "", "Un problème est survenu durant l'export csv des favoris"));
      }
    }
  }

  ngOnInit() {
  }
}

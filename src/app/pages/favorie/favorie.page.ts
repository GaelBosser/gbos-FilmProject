
import { FavorieMovieService } from './../../services/favoris/favorie-movie.service';
import { Component, OnInit } from '@angular/core';
import { NavController, Platform, AlertController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-favorie',
  templateUrl: './favorie.page.html',
  styleUrls: ['./favorie.page.scss'],
})
export class FavoriePage implements OnInit {

  favoriteMovies: any;
  filePath: any;
  fileName: any;

  constructor(public favorieMovieService: FavorieMovieService, public navCtrl: NavController, 
    private file: File, private platform: Platform, private alertController: AlertController,
    private fileChooser: FileChooser) { }

  ionViewWillEnter() {
    this.initFavoriteMovies();
  }

    ionRefresh(event) {
      //console.log('Pull Event Triggered!');
      setTimeout(() => {
        this.initFavoriteMovies();
        //console.log('Async operation has ended');

        //complete()  signify that the refreshing has completed and to close the refresher
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

  private initFavoriteMovies() {
    this.favorieMovieService.getFavoritesMovies().then(favs => { 
      this.favoriteMovies = favs;

      if(this.platform.is('desktop'))
      {
        this.file.createDir("C:/", "TESSSST IONIC 4", true);
        //this.download("sample.pdf","http://www.orimi.com/pdf-test.pdf");
        console.log('platform desktop');
      }
    });
  }

  async importFavorite() {
    if(this.platform.is('android'))
    {
      this.fileChooser.open().then(uri => this.filePath = uri.toString()).catch(e => this.presentAlert("Alert", "", e));
      this.file.resolveLocalFilesystemUrl(this.filePath).then(data => this.fileName = data);
      this.filePath = this.filePath.replace(this.fileName, "");
      alert(this.filePath + " : " + this.fileName);
      this.file.readAsDataURL(this.filePath, this.fileName).then(favoris => this.favoriteMovies = favoris);
      this.presentAlert("Favoris importé", "", JSON.stringify(this.favoriteMovies));
    }
  }

  exportFavorite() {
    if(this.platform.is('android'))
    {
      if(this.favoriteMovies.length == 0){
        this.presentAlert("Alert", "", "Vous n'avez aucun favoris à exporter.");
      }
      else{
        this.file.writeFile(this.filePath, this.fileName, JSON.stringify(this.favoriteMovies), {replace: true});
        this.presentAlert("Favoris exporté", "", "Chemin du fichier : " + this.filePath + "/" + this.fileName);
      }
    }
  }

  async presentAlert(headerAlert: string, subHeaderAlert: string, messageAlert: string) {
      
    const alert = await this.alertController.create({
      header: headerAlert,
      subHeader: subHeaderAlert,
      message: messageAlert,
      buttons: ['OK']
    });
    return await alert.present();
  }

  ngOnInit() {

  }
}

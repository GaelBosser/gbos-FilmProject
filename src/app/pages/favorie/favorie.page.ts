import { FavorieMovieService } from './../../services/favoris/favorie-movie.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-favorie',
  templateUrl: './favorie.page.html',
  styleUrls: ['./favorie.page.scss'],
})
export class FavoriePage implements OnInit {

  favoriteMovies = [];

  constructor(public favorieMovieService: FavorieMovieService, public navCtrl: NavController) { }
 
  ionViewWillEnter() {
    this.favoriteMovies = [];
    this.initFavoriteMovies();
  }

    ionRefresh(event) {
      //console.log('Pull Event Triggered!');
      setTimeout(() => {
        this.ionViewWillEnter();
        //console.log('Async operation has ended');

        //complete()  signify that the refreshing has completed and to close the refresher
        event.target.complete();
      }, 2000);
  }

  getRouterLink(movie: any){
    if(movie.Type == "episode"){
      this.navCtrl.navigateForward('/detail/' + movie.seriesID + '/season/' + movie.Season + '/episode/' + movie.Episode);
    }
    else{
      this.navCtrl.navigateForward('/detail/' + movie.imdbID);
    }
  }

  private initFavoriteMovies() {
    this.favorieMovieService.getFavoritesMovies().then(favs => (this.favoriteMovies = favs));
  }

  ngOnInit() {
  }
  
}

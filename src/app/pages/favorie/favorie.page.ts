import { FavorieMovieService } from './../../services/favoris/favorie-movie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorie',
  templateUrl: './favorie.page.html',
  styleUrls: ['./favorie.page.scss'],
})
export class FavoriePage implements OnInit {

  id: string;
  favoriteMovies = [];

  constructor(public favorieMovieService: FavorieMovieService) { }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MyMoviesPage");
  }
 
  ionViewWillEnter() {
    this.initFavoriteMovies();
  }
 
  private initFavoriteMovies() {
    this.favorieMovieService.getFavoriteMovies().then(favs => (this.favoriteMovies = favs));
  }
 
  findMovie() {
    console.log("find movie");
    //this.navCtrl.navigateRoot('');
  }
 
  goToDetail(movie: any) {
    this.id = movie.imdbID;
    console.log("go to detail");
    //this.navCtrl.navigateForward('detail/' + this.id, movie);
  }

  ngOnInit() {
  }
  
}

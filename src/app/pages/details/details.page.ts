import { DisplayAlertUtils } from './../../utils/displayAlertUtils';
import { FavorieMovieService } from './../../services/favoris/favorie-movie.service';

import { OmdbServiceService } from '../../services/omdb/omdb-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  detailsMovie: any;
  plot: string = "full";
  id: string;
  seasonArray = [];
  isFavorite: boolean = false;
  displayAlert: DisplayAlertUtils;

  async getDetailMovie() {
    await this.api.getDetailMovieById(this.id, this.plot)
    .subscribe(res => {
      this.detailsMovie = res;
      if(this.detailsMovie.Type == "series" && this.seasonArray.length == 0)
      {
        for(let i = 1; i <= parseInt(this.detailsMovie.totalSeasons); i++)
        {
          this.seasonArray.push(i);
        }
      }
    }, err => this.displayAlert.presentAlert("Alert", "", err));
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.favoriteMovieService.toogleFavoriteMovie(this.detailsMovie);
  }
  
  backButtonClickEvent()
  {
    this.navCtrl.goBack();
  }

  constructor(public api: OmdbServiceService, private route: ActivatedRoute, public navCtrl: NavController, 
    public favoriteMovieService: FavorieMovieService) {
      this.displayAlert = new DisplayAlertUtils();
     }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ionViewWillEnter(){
    this.getDetailMovie();
  }

  ionViewDidEnter(){
    this.favoriteMovieService.isFavoriteMovie(this.id).then(value => (this.isFavorite = value))
      .catch(err => this.displayAlert.presentAlert("Alert", "", err));
  }
}

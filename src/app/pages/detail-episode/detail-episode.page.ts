import { OmdbServiceService } from '../../services/omdb/omdb-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FavorieMovieService } from './../../services/favoris/favorie-movie.service';

@Component({
  selector: 'app-detail-episode',
  templateUrl: './detail-episode.page.html',
  styleUrls: ['./detail-episode.page.scss'],
})
export class DetailEpisodePage implements OnInit {

  id: string;
  idSeason: string;
  idEpisode: string;
  detailEpisode : any;
  detailSeason: any;
  isFavorite: boolean = false;

  async getDetailSeason() {
    await this.api.getSeasonById(this.id, this.idSeason)
    .subscribe(res => {
      this.detailSeason = res;
    }, err => {
      console.log(err);
    });
  }

  async getDetailEpisode() {
    await this.api.getEpisodeById(this.id, this.idSeason, this.idEpisode)
    .subscribe(res => {
      this.detailEpisode = res;
    }, err => {
      console.log(err);
    });
  }

  constructor(public api: OmdbServiceService, private route: ActivatedRoute, public navCtrl: NavController,
    public favoriteMovieService: FavorieMovieService) { }

  backButtonClickEvent()
  {
    this.navCtrl.goBack();
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.favoriteMovieService.toogleFavoriteMovie(this.detailEpisode);
  }

  ngOnInit()
  {
    this.id = this.route.snapshot.paramMap.get('id');
    this.idSeason = this.route.snapshot.paramMap.get('idSeason');
    this.idEpisode = this.route.snapshot.paramMap.get('idEpisode');
  }

  ionViewWillEnter(){
    this.getDetailSeason();
    this.getDetailEpisode();
  }

  ionViewDidEnter(){
    this.favoriteMovieService.isFavoriteMovie(this.id).then(value => (this.isFavorite = value));
  }

}

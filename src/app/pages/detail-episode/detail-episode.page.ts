import { OmdbServiceService } from '../../services/omdb/omdb-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

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

  constructor(public api: OmdbServiceService, private route: ActivatedRoute, public navCtrl: NavController) { }

  backButtonClickEvent()
  {
    this.navCtrl.goBack();
  }

  ngOnInit()
  {
    this.id = this.route.snapshot.paramMap.get('id');
    this.idSeason = this.route.snapshot.paramMap.get('idSeason');
    this.idEpisode = this.route.snapshot.paramMap.get('idEpisode');
    this.getDetailSeason();
    this.getDetailEpisode();
  }

}

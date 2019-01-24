
import { OmdbServiceService } from '../../services/omdb/omdb-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detail-saison',
  templateUrl: './detail-saison.page.html',
  styleUrls: ['./detail-saison.page.scss'],
})
export class DetailSaisonPage implements OnInit {

  id: string;
  idSeason: string;
  detailSeason : any;

  async getDetailSeason() {
    await this.api.getSeasonById(this.id, this.idSeason)
    .subscribe(res => {
      this.detailSeason = res;
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
    this.getDetailSeason();
  }
}

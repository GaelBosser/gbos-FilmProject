import { Saison } from './../../models/serie/saison';
import { BaseDetailPage } from './../baseDetailPage';
import { OmdbServiceService } from '../../services/omdb/omdb-service.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { isUndefined } from 'util';

@Component({
  selector: 'app-detail-saison',
  templateUrl: './detail-saison.page.html',
  styleUrls: ['./detail-saison.page.scss'],
})
export class DetailSaisonPage extends BaseDetailPage {

  idSeason: string;
  detailSeason: Saison;

  constructor(protected api: OmdbServiceService, protected route: ActivatedRoute, protected navCtrl: NavController) {
    super(api, route, navCtrl)
  }

  ngOnInit() {
    super.ngOnInit();
    this.idSeason = this.route.snapshot.paramMap.get('idSeason');
    this.getDetailSeason();
  }

  async getDetailSeason() {
    await this.api.getSeasonById(this.id, this.idSeason)
      .subscribe(res => {
        this.detailSeason = res;
        this.setTitlePage();
      }, err => this.displayAlert.presentAlert("Alert", "", err));
  }

  setTitlePage() {
    this.titlePage = `Détail série ${this.detailSeason.Title} Saison ${this.detailSeason.Season}`;
  }
}
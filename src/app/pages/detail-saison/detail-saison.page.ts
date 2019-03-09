import { Saison } from './../../models/serie/saison';
import { BaseDetailPage } from './../baseDetailPage';
import { OmdbServiceService } from '../../services/omdb/omdb-service.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-detail-saison',
  templateUrl: './detail-saison.page.html',
  styleUrls: ['./detail-saison.page.scss'],
})
export class DetailSaisonPage extends BaseDetailPage {

  idSeason: string;
  detailSeason: Saison;

  constructor(protected api: OmdbServiceService, protected route: ActivatedRoute, protected navCtrl: NavController,
    protected loadingController: LoadingController) {
    super(api, route, navCtrl, loadingController)
  }

  ngOnInit() {
    super.ngOnInit();
    this.idSeason = this.route.snapshot.paramMap.get('idSeason');
    this.getDetailSeason();
  }

  async getDetailSeason() {
    await this.presentLoading();
    await this.api.getSeasonById(this.id, this.idSeason)
      .subscribe(res => {
        this.detailSeason = res;
        this.setTitlePage();
      }, err => this.displayAlert.presentAlert("Alert", "", err));
    await this.dismissLoading();
  }

  setTitlePage() {
    this.titlePage = `Détail série ${this.detailSeason.Title} Saison ${this.detailSeason.Season}`;
  }
}
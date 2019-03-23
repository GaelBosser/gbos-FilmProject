import { AlertType } from './../../utils/displayAlertUtils';
import { Saison } from './../../models/serie/saison';
import { BaseDetailPage } from './../baseDetailPage';
import { OmdbServiceService } from '../../services/omdb/omdb-service.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, AlertController, ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-detail-saison',
  templateUrl: './detail-saison.page.html',
  styleUrls: ['./detail-saison.page.scss'],
})
export class DetailSaisonPage extends BaseDetailPage {

  idSeason: string;
  detailSeason: Saison;

  constructor(protected api: OmdbServiceService, protected route: ActivatedRoute, protected navCtrl: NavController,
    protected loadingController: LoadingController, protected socialSharing: SocialSharing, protected alertController: AlertController,
    protected actionSheetController: ActionSheetController) {
    super(api, route, navCtrl, loadingController, socialSharing, alertController, actionSheetController)
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
      }, err => this.displayAlert.presentAlert(AlertType.Erreur, "", "Une erreur est survenue lors de la récupération du détail de la saison"));
    await this.dismissLoading();
  }

  setTitlePage() {
    this.titlePage = `Détail série ${this.detailSeason.Title} Saison ${this.detailSeason.Season}`;
  }
}
import { LoadingController, AlertController, ActionSheetController } from '@ionic/angular';
import { BaseListPage } from './../baseListPage';
import { Component } from '@angular/core';
import { OmdbServiceService } from '../../services/omdb/omdb-service.service';
import { TypeMovie } from 'src/app/models/typeMovie/typeMovie';

@Component({
  selector: 'app-serie',
  templateUrl: './listSerie.page.html',
  styleUrls: ['./listSerie.page.scss'],
})
export class ListSeriePage extends BaseListPage {

  typeMovie: TypeMovie;

  constructor(protected api: OmdbServiceService, protected loadingController: LoadingController, protected alertController: AlertController,
    protected actionSheetController: ActionSheetController) {
    super(api, loadingController, alertController, actionSheetController)
    this.typeMovie = TypeMovie.Series;
    this.titlePage = "Liste de séries";
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
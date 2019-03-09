import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { BasePage } from './basePage';
import { OmdbServiceService } from '../services/omdb/omdb-service.service';

export class BaseDetailPage extends BasePage {

    id: string;

    constructor(protected api: OmdbServiceService, protected route: ActivatedRoute, protected navCtrl: NavController,
        protected loadingController: LoadingController) {
        super(loadingController)
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        super.ngOnInit();
    }

    backButtonClickEvent() {
        this.navCtrl.goBack();
    }
}
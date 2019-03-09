import { AlertType } from './../utils/displayAlertUtils';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { BasePage } from './basePage';
import { OmdbServiceService } from '../services/omdb/omdb-service.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

export class BaseDetailPage extends BasePage {

    id: string;

    constructor(protected api: OmdbServiceService, protected route: ActivatedRoute, protected navCtrl: NavController,
        protected loadingController: LoadingController, protected socialSharing: SocialSharing) {
        super(loadingController)
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        super.ngOnInit();
    }

    backButtonClickEvent() {
        this.navCtrl.goBack();
    }

    shareMovie(message?: string, subject?: string, file?: string | string[], url?: string) {
        this.socialSharing.share(message, subject, file, url).catch(err =>
            this.displayAlert.presentAlert(AlertType.Erreur, "", "Une erreur est survenue durant le partage."));
    }
}
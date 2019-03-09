import { DisplayAlertUtils } from './../utils/displayAlertUtils';
import { OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

export class BasePage implements OnInit {

    protected titlePage: string;
    protected displayAlert: DisplayAlertUtils;
    private loadingElement: HTMLIonLoadingElement;

    constructor(protected loadingController: LoadingController) {
        this.displayAlert = new DisplayAlertUtils();
    }

    ngOnInit() {
    }

    async presentLoading() {
        this.loadingElement = await this.loadingController.create({
            message: 'Chargement en cours...',
            spinner: 'crescent',
            duration: 2000
        });
        return await this.loadingElement.present();
    }

    async dismissLoading(){
        return await this.loadingElement.dismiss();
    }
}
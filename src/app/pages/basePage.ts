import { DisplayAlertUtils } from './../utils/displayAlertUtils';
import { OnInit } from '@angular/core';
import { LoadingController, Platform, AlertController, ActionSheetController } from '@ionic/angular';
import { RootImageConstantes } from '../constantes/rootImageConstantes';
import { DefaultValueApiConstantes } from '../constantes/defaultValueApiConstantes';

export class BasePage implements OnInit {

    protected titlePage: string;
    protected displayAlert: DisplayAlertUtils;
    private loadingElement: HTMLIonLoadingElement;
    protected constantesImages: RootImageConstantes;
    protected constantesValueApi: DefaultValueApiConstantes;

    constructor(protected loadingController: LoadingController, protected alertController: AlertController,
        protected actionSheetController: ActionSheetController) {
        this.displayAlert = new DisplayAlertUtils(alertController, actionSheetController);
        this.constantesImages = RootImageConstantes.getInstance();
        this.constantesValueApi = DefaultValueApiConstantes.getInstance();
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
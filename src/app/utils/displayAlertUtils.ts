import { IAlert } from '../interfaces/IAlert';
import { AlertController } from '@ionic/angular';
import { AlertButton } from '@ionic/core';

export enum AlertType{
  Alert = "Alerte",
  Question = "Question"
}

export class DisplayAlertUtils implements IAlert {

    alertController: AlertController;

    constructor(){
        this.alertController = new AlertController();
    }

    async presentAlert(headerAlert: string, subHeaderAlert: string, messageAlert: string, buttonsAlert: (string | AlertButton)[] = ['OK']): Promise<void> {
      
      const alert = await this.alertController.create({
        header: headerAlert,
        subHeader: subHeaderAlert,
        message: messageAlert,
        buttons: buttonsAlert
      });
      return await alert.present();
    }
}
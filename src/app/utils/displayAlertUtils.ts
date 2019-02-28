import { IAlert } from '../interfaces/IAlert';
import { AlertController } from '@ionic/angular';

export class DisplayAlertUtils implements IAlert {

    alertController: AlertController;

    constructor(){
        this.alertController = new AlertController();
    }

    async presentAlert(headerAlert: string, subHeaderAlert: string, messageAlert: string) {
      
        const alert = await this.alertController.create({
          header: headerAlert,
          subHeader: subHeaderAlert,
          message: messageAlert,
          buttons: ['OK']
        });
        return await alert.present();
      }
}
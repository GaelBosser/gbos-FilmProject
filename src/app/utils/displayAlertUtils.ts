import { IAlert } from '../interfaces/IAlert';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { AlertButton, ActionSheetButton } from '@ionic/core';

export enum AlertType {
  Alert = "Alerte",
  Question = "Question",
  Erreur = "Erreur",
  Succes = "Succès",
}

export class DisplayAlertUtils implements IAlert {

  alertController: AlertController;
  actionSheetController: ActionSheetController;

  constructor() {
    this.alertController = new AlertController();
    this.actionSheetController = new ActionSheetController();
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

  async presentActionSheet(headerSheet: string, buttonsSheet: (string | ActionSheetButton)[]) {
    const actionSheet = await this.actionSheetController.create({
      header: headerSheet,
      buttons: buttonsSheet
    });
    await actionSheet.present();
  }
}
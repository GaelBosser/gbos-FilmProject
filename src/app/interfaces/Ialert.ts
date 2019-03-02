import { AlertButton } from "@ionic/core";

export interface IAlert{
    presentAlert(titleAlert: string, subTitleAlert: string, messageAlert: string, buttonsAlert: (string | AlertButton)[]): Promise<void>
}
import { DisplayAlertUtils } from './../utils/displayAlertUtils';

export class BasePage{

    protected titlePage: string;
    protected displayAlert: DisplayAlertUtils;

    constructor(){
        this.displayAlert = new DisplayAlertUtils();
    }
}
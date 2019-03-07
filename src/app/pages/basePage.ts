import { DisplayAlertUtils } from './../utils/displayAlertUtils';
import { OnInit } from '@angular/core';

export class BasePage implements OnInit {

    protected titlePage: string;
    protected displayAlert: DisplayAlertUtils;

    constructor() {
        this.displayAlert = new DisplayAlertUtils();
    }

    ngOnInit() {
    }
}
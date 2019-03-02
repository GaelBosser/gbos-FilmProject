import { BaseDetailModel } from './../baseDetailModel';

export class Episode extends BaseDetailModel {
    Season: string;
    Episode: string;
    seriesID: string;
}
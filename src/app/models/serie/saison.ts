import { BaseModel } from './../baseModel';
import { Episode } from "./episode";

export class Saison extends BaseModel {
    Season: string;
    totalSeasons: string;
    Episodes: Episode[];
}
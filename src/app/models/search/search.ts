import { BaseModel } from './../baseModel';
import { BaseImdbModel } from '../baseImdbModel';

export class Search extends BaseModel {
    Search:       BaseImdbModel[];
    totalResults: string;
}
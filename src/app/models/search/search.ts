import { BaseModel } from './../baseModel';
import { BaseImdbModel } from '../baseImdbModel';

export interface Search extends BaseModel {
    Search:       BaseImdbModel[];
    totalResults: string;
}
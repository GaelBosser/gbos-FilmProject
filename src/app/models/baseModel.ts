import { ResponseAPI } from './responseAPI/responseAPI';
import { IBaseModel } from '../interfaces/IbaseModel';

export class BaseModel implements IBaseModel{
    Title: string;
    Response: ResponseAPI;
}
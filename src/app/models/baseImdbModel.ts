import { BaseModel } from './baseModel';
import { TypeMovie } from './typeMovie/typeMovie';

export class BaseImdbModel extends BaseModel{
    Year:   string;
    imdbID: string;
    Type:   TypeMovie;
    Poster: string;
}
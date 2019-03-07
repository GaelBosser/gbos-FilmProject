import { BaseImdbModel } from './baseImdbModel';
import { Rating } from './rating/rating';

export enum Plot{
    Short = "short",
    Full = "full",
}

export class BaseDetailModel extends BaseImdbModel{
    Rated:      string;
    Released:   string;
    Runtime:    string;
    Genre:      string;
    Director:   string;
    Writer:     string;
    Actors:     string;
    Plot:       Plot;
    Language:   string;
    Country:    string;
    Awards:     string;
    Poster:     string;
    Ratings:    Rating[];
    Metascore:  string;
    imdbRating: string;
    imdbVotes:  string;
}
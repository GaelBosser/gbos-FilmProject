import { AlertType } from './../utils/displayAlertUtils';
import { TypeMovie } from './../models/typeMovie/typeMovie';
import { BaseImdbModel } from './../models/baseImdbModel';
import { Search } from './../models/search/search';
import { BasePage } from './basePage';
import { OmdbServiceService } from '../services/omdb/omdb-service.service';
import { ResponseAPI } from '../models/responseAPI/responseAPI';

export class BaseListPage extends BasePage {

    protected searchTextBool: boolean;
    protected searchText: string;
    protected lastSearchText: string;
    protected textIntrouvable: boolean;
    protected data: Search;
    protected results: Array<BaseImdbModel>;
    protected page: number;
    protected displaySearchBar: boolean;
    protected endInfiniteScroll: boolean;

    constructor(protected api: OmdbServiceService) {
        super()
        this.results = new Array<BaseImdbModel>();
        this.displaySearchBar = true;
        this.page = 1;
    }

    ngOnInit() {
        super.ngOnInit();
    }

    async getSearchBar(typeMovie: TypeMovie) {
        await this.api.getByTitle(this.searchText.trim(), typeMovie, this.page)
            .subscribe(res => {
                this.data = res;
                this.updateLastSearchedResult();
                this.responseSearchApi(res);
            },
            err => this.displayAlert.presentAlert(AlertType.Alert, "", "Une erreur est survenue durant l'appel au serveur."));
    }

    responseSearchApi(res: Search): void {
        if (res.Response == ResponseAPI.False) {
            this.textIntrouvable = true;
            this.results = [];
        }
        else {
            this.textIntrouvable = false;
            for (let i = 0; i < this.data.Search.length; i++) {
                this.results.push(this.data.Search[i]);
            }
        }
    }

    updateLastSearchedResult(): void {
        if (this.lastSearchText != this.searchText) {
            this.results = [];
            this.lastSearchText = this.searchText;
            this.endInfiniteScroll = false;
        }
        if (this.searchText.trim() == "")
            this.searchTextBool = false;
        else
            this.searchTextBool = true;
    }

    searchbarEventClick(event: EventSource) {
        this.displaySearchBar = !this.displaySearchBar;
    }

    doInfinite(infiniteScroll: any, typeMovie: TypeMovie): Promise<any> {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (this.results.length < parseInt(this.data.totalResults)) {
                    this.page++;
                    this.getSearchBar(typeMovie);
                }
                else
                    this.endInfiniteScroll = true;
                resolve();
                infiniteScroll.target.complete();
            }, 500);
        })
    }
}
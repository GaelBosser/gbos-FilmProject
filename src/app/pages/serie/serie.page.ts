import { DisplayAlertUtils } from './../../utils/displayAlertUtils';
import { Component, OnInit } from '@angular/core';
import { OmdbServiceService } from '../../services/omdb/omdb-service.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.page.html',
  styleUrls: ['./serie.page.scss'],
})
export class SeriePage implements OnInit {

  searchSerieBool: boolean;
  searchSerie: string;
  lastSearchSerie: string;
  serieIntrouvable: boolean;
  data : any;
  series = [];
  page: number = 1;
  type: string = "series";
  displaySearchBar: boolean = true;
  displayAlert: DisplayAlertUtils;

  async getSerieSearchBar() {
    await this.api.getByTitle(this.searchSerie.trim(), this.type, this.page)
      .subscribe(res => {
        this.data = res;

        if(this.lastSearchSerie != this.searchSerie)
        {
          this.series = [];
        }

        if(res.Response == "False")
        {
          this.serieIntrouvable = true;
          this.series = [];
        }
        else
        {
          this.serieIntrouvable = false;
          for(let i=0; i<this.data.Search.length; i++)
          {
            this.series.push(this.data.Search[i]);
          }
        }
        if(this.searchSerie.trim() == "")
        {
          this.searchSerieBool = false;
        } 
        else
        {
          this.searchSerieBool = true;
        }

        this.lastSearchSerie = this.searchSerie;
      }, err => this.displayAlert.presentAlert("Alert", "", err));
  }

  searchbarEvent(event: any) {
    this.displaySearchBar = !this.displaySearchBar;
  }

  doInfinite(infiniteScroll: any): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.page++;
        this.getSerieSearchBar();
        resolve();
        infiniteScroll.target.complete();
      }, 500);
    })
  }

  constructor(public api: OmdbServiceService) {
    this.displayAlert = new DisplayAlertUtils();
   }

  ngOnInit() {}
}

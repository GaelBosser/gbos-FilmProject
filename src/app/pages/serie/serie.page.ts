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
      }, err => {
        console.log(err);
      });
  }

  searchbarEvent(event) {
    this.displaySearchBar = !this.displaySearchBar;
  }

  doInfinite(infiniteScroll): Promise<any> {
    //console.log('Begin async operation');

    return new Promise((resolve) => {
      setTimeout(() => {
        this.page++;
        this.getSerieSearchBar();

        //console.log('Async operation has ended');
        resolve();
        infiniteScroll.target.complete();
      }, 500);
    })
  }

  constructor(public api: OmdbServiceService) { }

  ngOnInit() {}
}

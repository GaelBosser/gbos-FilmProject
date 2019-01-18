
import { OmdbServiceService } from '../../services/omdb/omdb-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  detailsMovie: any;
  plot: string = "full";
  id: string;
  seasonArray = [];

  async getDetailMovie() {
    await this.api.getDetailMovieById(this.id, this.plot)
    .subscribe(res => {
      this.detailsMovie = res;
      if(this.detailsMovie.Type == "series")
      {
        for(let i = 1; i <= parseInt(this.detailsMovie.totalSeasons); i++)
        {
          this.seasonArray.push(i);
        }
      }
    }, err => {
      console.log(err);
    });
  }
  
  backButtonClickEvent()
  {
    this.navCtrl.goBack();
  }

  constructor(public api: OmdbServiceService, private route: ActivatedRoute, public navCtrl: NavController) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getDetailMovie();
  }

}

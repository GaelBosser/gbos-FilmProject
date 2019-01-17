
import { OmdbServiceService } from '../../services/omdb/omdb-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  detailsMovie: any;
  plot: string = "full";
  id: string;

  async getDetailMovie() {
    await this.api.getDetailMovieById(this.id, this.plot)
    .subscribe(res => {
      this.detailsMovie = res;
    }, err => {
      console.log(err);
    });
  } 

  constructor(public api: OmdbServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getDetailMovie();
  }

}

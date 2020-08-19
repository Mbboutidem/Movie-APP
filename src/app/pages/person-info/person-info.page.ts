import { Component, OnInit } from '@angular/core';
import { TrackService } from 'src/app/services/track.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TmdbService } from 'src/app/services/tmdb.service';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.page.html',
  styleUrls: ['./person-info.page.scss'],
})
export class PersonInfoPage implements OnInit {
  // properties
  personDetails: Person;

  constructor(
    private router: Router,
    private trk: TrackService,
    private tmdb: TmdbService,
    private activateR: ActivatedRoute
  ) { }

  ngOnInit() {
    const personId = this.activateR.snapshot.params['id'];
    this.getPersonDetails(personId);
  }
  getPersonDetails(id: number){
    this.tmdb.fetchPersonDetails(id).subscribe(resp => {
      this.personDetails = resp;
    })
  }
  movieDetails(id: number){
    this.router.navigate(['movie-details', id])
  }


}

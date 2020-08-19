import { Component, OnInit } from '@angular/core';
import { TmdbService } from 'src/app/services/tmdb.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TrackService } from 'src/app/services/track.service';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  //
  movieData: Movie;

  constructor(
    private tmdb: TmdbService,
    public router: Router,
    private trk: TrackService,
    private activateRou: ActivatedRoute,
    ) 
    { }

  ngOnInit() {
    const movieId = this.activateRou.snapshot.params['id'];
    this.getMovieDetails(movieId)
    }

  getMovieDetails(id: number){
    this.tmdb.fetchMoviedetails(id).subscribe(resp => {
      this.movieData = resp;
      this.trk.viewMovie(id, this.movieData.title);
      console.log(this.movieData);
    })
  }
  
  PersonInfo(id: number) {
    // this.tmdb.fetchMoviedetails = id;
    this.router.navigate(['person-info', id]);
  }

}

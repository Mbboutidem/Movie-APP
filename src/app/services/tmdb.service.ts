import { Injectable, Query } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, delay } from 'rxjs/operators';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';
import { Person } from '../models/person';

const Urlkey = environment.UrlKey;
const ApiKey = environment.ApiKey;

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  constructor(private _http: HttpClient) { }

   //top upcoming movies
   fetcUpcomingMovies(page: number){
    return this._http.get(`${Urlkey}/movie/upcoming?api_key${ApiKey}&language=en-Us&page=${page}`)
    .pipe(map((res: any) => <Movie[]>res.results));
  }

  //get popular movies
  fetchPopularMovies(page: number){
    return this._http.get(`${Urlkey}/movie/popular?api_key=${ApiKey}&language=en-Us&page=${page}`)
    .pipe(map((res: any) => <Movie[]>res.results))
    .pipe(delay(500));
  }
  fetchNowPlaying(page: number){
    return this._http.get(`${Urlkey}/movie/now_playing?api_key=${ApiKey}&language=en-US&page=${page}`)
    .pipe(map((res: any) => <Movie[]>res.results));
  }

  fetchTopratedMovies(page: number){
    return this._http.get(`${Urlkey}/movie/top_rated?api_key=${ApiKey}&language=en-Us&page=${page}`)
    .pipe(map((res: any) => <Movie[]>res.results));
  }
  //movie details
  fetchMoviedetails(id: number){
    const append = '&append_to_response=credits';
    return this._http.get<Movie>(`${Urlkey}/movie/${id}?api_key=${ApiKey}&language=en-Us${append}`);
  }
  //person details
  fetchPersonDetails(id: number){
    const append = '&append_to_response=credits';
    return this._http.get<Person>(`${Urlkey}/person/${id}?api_key=${ApiKey}&language=en-Us${append}`)
  }
  
  //https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US
  fetchGenresMovies(){
    return this._http.get(`${Urlkey}/genre/movie/list?api_key=${ApiKey}&language=en-Us`)
    .pipe(map((res: any) => <Movie[]>res.results));
    // .pipe(map((res: any) => <Movie[]>res.results))
  }
  //search movies
  searchMovies(name: string){
    return this._http.get(`${Urlkey}/search/movie?api_key=${ApiKey}&language=en-Us&page=${name}`)
  }
}

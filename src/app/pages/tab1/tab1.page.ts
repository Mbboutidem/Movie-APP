import { Component, OnInit, ViewChild } from '@angular/core';
import { TmdbService } from 'src/app/services/tmdb.service';
import { Movie } from 'src/app/models/movie';
import {  LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  // @ViewChild(Content) content: Content;
  pageNumber: number = 1;
  isDataload: boolean = false;
  selectCategory: string = 'popular';

  //array for movies
  movieData: Movie[] = [];
  
  // genres: any;

  constructor(private tmdb: TmdbService, public router: Router, public loadingCtrl: LoadingController ) {}


  ngOnInit(){
    this.getMovies();
    // this.getGenreMovies()
    //throw new Error("Method not implemented.");
  }
  changeCategory(category: string){
    this.pageNumber = 1;
    this.movieData = [];
    this.getMovies();

  }
  // getMovies() {
  //   let service;
  //   switch (this.selectCategory) {
  //     case 'popular':  service = this.tmdb.fetchPopularMovies(this.pageNumber); break;
  //     case 'top':      service = this.tmdb.fetchTopratedMovies(this.pageNumber); break;
  //     case 'upcoming': service = this.tmdb.fetcUpcomingMovies(this.pageNumber); break;
  //   }
  //   // const loadingOpts = { translucent: true, spinner: 'crescent', content: 'Cargando' };
  //   // const loading = await this.loadingCtrl.create(loadingOpts);
  //   // loading.present();
  //   service.subscribe(res => {
  //     this.movieData = this.movieData.concat(res);
  //     console.log(this.movieData)
  //     // loading.dismiss();
  //   }, err => { 
  //     this.movieData = [];
      
  //   });
  // }
  //
 getMovies(){
   switch(this.selectCategory){
     case "upcoming":
       this.selectCategory = "upcoming";
       this.tmdb.fetcUpcomingMovies(this.pageNumber).subscribe(resp => {
         this.movieData = this.movieData.concat(resp);
        this.isDataload = true;
        console.log(this.movieData)
       }); break;
       case "popular":
         this.selectCategory = "popular";
         this.tmdb.fetchPopularMovies(this.pageNumber).subscribe(resp => {
           this.movieData = this.movieData.concat(resp);
          //  this.infiniteScroll.complete();
          //  this.coreService.hideLoadingIcon();
           this.isDataload = true;
         });
         break;
       case "nowPlaying":
         this.selectCategory = "nowPlaying";
         this.tmdb.fetchNowPlaying(this.pageNumber).subscribe(resp => {
           this.movieData = this.movieData.concat(resp);
          //  this.infiniteScroll.complete();
          //  this.isDataload = true;
         });
         break;
       case "topRated":
         this.selectCategory = "topRated";
         this.tmdb.fetchTopratedMovies(this.pageNumber).subscribe(movieResponse => {
           this.movieData = this.movieData.concat(movieResponse);
          //  this.infiniteScroll.complete();
          //  this.isDataload = true;
         });
         break;
       default:
         break;
      //  console.log(this.movieData)
   }
  }
  //
  MovieDetail(id: number){
    this.router.navigate(['movie-detail', id]);
  }
loadMovies(){
  this.pageNumber = this.pageNumber++;
  this.getMovies();
}

}

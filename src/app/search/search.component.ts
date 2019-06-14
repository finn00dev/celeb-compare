import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Actor } from '../actor';
import { Movie } from '../movie';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private movieApi: MovieService) { }

  actor1: Actor;
  actor2: Actor;

  actor1_name: string;
  actor2_name: string;

  actor1_autocomplete: string[] = [];
  actor2_autocomplete: string[] = [];

  results: Movie[];

  ngOnInit() {
    //this.movieApi.getActor("Bill Burr").subscribe( data => console.log(data));
  }

  async searchForActors() {
    await this.getMovies1();
    await this.getMovies2();
    this.results = this.intersectionMovies(this.actor1.movies, this.actor2.movies);
  }

  onInputType1(name: string){
    this.setActor1(name);
    this.retrieveAutoC1(name);
  }

  onInputType2(name: string){
    this.setActor2(name);
    this.retrieveAutoC2(name);
  }

  setActor1(search: string) {

    if(search != "")  {

      this.movieApi.getActor(search).subscribe( data => {
      
        try {
          let details = data['results'][0];

          if(details['profile_path']){
            this.actor1 = {id: details['id'], name: details['name'], movies: [], headshot: "http://image.tmdb.org/t/p/w185" + details['profile_path']};
          } else {
            this.actor1 = {id: details['id'], name: details['name'], movies: [], headshot: null};
          }

        } catch (OutOfBoundsException) {
          
          this.actor1 = null;
        }

      });
    } else {
      this.actor1 = null;
    }
    
  }

  setActor2(search: string) {

    if(search != "")  {
      this.movieApi.getActor(search).subscribe( data => {
        try {
          let details = data['results'][0];

          if(details['profile_path']){
            this.actor2 = {id: details['id'], name: details['name'], movies: [], headshot: "http://image.tmdb.org/t/p/w185" + details['profile_path']};
          } else {
            this.actor2 = {id: details['id'], name: details['name'], movies: [], headshot: null};
          }

        } catch (OutOfBoundsException) {
           
          this.actor2 = null;
        }

      });
    } else {
      this.actor2 = null;
    }
    
  }
  

  async getMovies1() {

    await this.movieApi.getActorsMovies(this.actor1.id).toPromise().then( data => {
      
      for( let movie of data['cast']){

        if(movie['title']){
          this.actor1.movies.push({
            id: movie['id'],
            name: movie['title'],
            poster_location: "http://image.tmdb.org/t/p/w185" + movie['poster_path']
          });
        } else {
          this.actor1.movies.push({
            id: movie['id'],
            name: movie['name'],
            poster_location: "http://image.tmdb.org/t/p/w185" + movie['poster_path']
          });
        }       

      }
      
    });
  }

  async getMovies2()  {

    await this.movieApi.getActorsMovies(this.actor2.id).toPromise().then( data => {
      for( let movie of data['cast']){

        if(movie['title']){
          this.actor2.movies.push({
            id: movie['id'],
            name: movie['title'],
            poster_location: movie['poster_path']
          });
        } else {
          this.actor2.movies.push({
            id: movie['id'],
            name: movie['name'],
            poster_location: movie['poster_path']
          });
        }       

      }
      
    });
  }

  retrieveAutoC1(name: string){
    this.actor1_autocomplete = [];
    if(name != "")  {
      this.movieApi.getActor(name).subscribe( data => {
        
        for(let person of data['results']){
          this.actor1_autocomplete.push(person['name']);
        }

        this.actor1_autocomplete = this.actor1_autocomplete.slice(0, 5);
        
      });
    }
  }

  retrieveAutoC2(name: string){
    this.actor2_autocomplete = [];
    if(name != "")  {
      this.movieApi.getActor(name).subscribe( data => {
        
        for(let person of data['results']){
          this.actor2_autocomplete.push(person['name']);
        }

        this.actor2_autocomplete = this.actor2_autocomplete.slice(0, 5);
        
      });
    }
  }

  intersectionMovies(arr1: any[], arr2: any[]) {
    let output = [];

    console.log(arr1.length);
    console.log(arr2.length);

    for(let elm1 of arr1){
      for(let elm2 of arr2){
        if(elm1.id == elm2.id){
          output.push(elm1);
        }
      }
    }

    return output;
  }

}

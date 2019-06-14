import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Actor } from './actor';
import { Movie } from './movie';
import { async } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  baseUrl = "https://api.themoviedb.org/3/";
  apiKey = "f5a59c806e6b426988a4ca4dff51d5de";
  urlEnd = "?api_key=" + this.apiKey + "&languageen-US";

  getActor(name: string): Observable<Object> {
    if(name != "" && name)  {
      let url = this.baseUrl + "search/person" + this.urlEnd + "&query=" + name.replace(" ", "%20");
      console.log(url);
      return this.http.get(url);
    } else {
      return null;
    }
  }
  
  getActorsMovies(id: number): Observable<Object> {
    let url = this.baseUrl + "person/" + id + "/combined_credits" + this.urlEnd;
    return this.http.get(url);
  }

  getActorCredit(movie_id: number) {
    let url = this.baseUrl + "movie/" + movie_id + "/credits" + this.urlEnd;
    return this.http.get(url).toPromise();
  }
}

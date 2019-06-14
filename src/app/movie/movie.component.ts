import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { Actor } from '../actor';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input() movie: Movie;
  @Input() actor1: Actor;
  @Input() actor2: Actor;

  actor1_credit: string;
  actor2_credit: string;

  constructor( private movieService: MovieService) { }

  ngOnInit() {
    this.getActor1MovieCredit(this.movie.id);
    this.getActor2MovieCredit(this.movie.id);
  }


  async getActor1MovieCredit(movie_id: number) {
    //console.log("value: ",movie_id,actor_id);
    
    await this.movieService.getActorCredit(movie_id).then( data => {

      //Tries to find actor in movies cast
      for(let cast_member of data['cast']){
        if(cast_member['id'] == this.actor1.id){
          this.actor1_credit = " - Actor - " + cast_member['character'];
          return;
        }
      }

      //Tries to find actor in movies crew
      for(let cast_member of data['crew']){
        if(cast_member['id'] == this.actor1.id){
          this.actor1_credit = " - Crew - " + cast_member['job'];
          return;
        }
      }

      this.actor1_credit = " - N/A";
    });

  }

  async getActor2MovieCredit(movie_id: number) {
    //console.log("value: ",movie_id,actor_id);
    
    await this.movieService.getActorCredit(movie_id).then( data => {

      //Tries to find actor in movies cast
      for(let cast_member of data['cast']){
        if(cast_member['id'] == this.actor2.id){
          this.actor2_credit = " - Actor - " + cast_member['character'];
          return;
        }
      }

      //Tries to find actor in movies crew
      for(let cast_member of data['crew']){
        if(cast_member['id'] == this.actor2.id){
          this.actor2_credit = " - Crew - " + cast_member['job'];
          return;
        }
      }
      
      this.actor2_credit = " - N/A";
    });

  }
}

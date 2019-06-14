import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { Actor } from '../actor';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  constructor( private movieService: MovieService) { }

  @Input() movies: Movie[];
  @Input() actor1: Actor;
  @Input() actor2: Actor;

  ngOnInit() {
  }


}

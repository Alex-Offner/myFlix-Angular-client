import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { UserProfileComponent } from '../user-profile/user-profile.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { DescriptionCardComponent } from '../description-card/description-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  user: { [key: string]: any } = {};
  // favMovies: any[] = this.user.FavoriteMovies;
  constructor(
    public fetchApiData: ApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies();
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  logout(): void {
    this.user = [];
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');

    let successMessage = 'Successfully logged out.'
    this.snackBar.open(successMessage, 'OK', {
      duration: 4000
    });
  }

  viewProfile(): void {
    // let favMovies = this.movies.filter(m => this.user.FavoriteMovies.includes(m._id));
    this.dialog.open(UserProfileComponent, {
      width: '480px',
      data: { user: this.user },
    });
    console.log(this.user);
  }

  openDesciptionCard(
    title: string,
    description: string
  ): void {
    this.dialog.open(DescriptionCardComponent, {
      data: {
        title,
        description,
      },
      width: '500px',
    });
  }

  openGenreCard(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name, description },
      width: '500px',
    });
  }

  openDirectorCard(name: string, bio: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: { name, bio },
      width: '500px',
    });
    console.log(this.movies)
  }
}
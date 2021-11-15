import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  user: { [key: string]: any } = {};
  constructor(
    public fetchApiData: ApiDataService,
    public dialog: MatDialog,
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
    // let favMoves = this.moves.filter(m => this.user.FavoriteMoves.includes(m._id));
    this.dialog.open(UserProfileComponent, {
      width: '480px',
      data: { user: this.user },
    });
    console.log(this.user);
  }
}
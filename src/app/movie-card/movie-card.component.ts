/**
 * The movie-card shows all movies an a navbar. Users can navigate to their user profile as well as genre, director and description modals. 
 * A logout button lets them log out.
 * @module MovieCardComponent
 */

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
  //Getting user info from localStorage if present
  user: any = JSON.parse(localStorage.getItem('user') || '');
  favourites: any[] = [];

  constructor(
    public fetchApiData: ApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies();
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  /**
 * Get all movies from database
 */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      // console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Send PUT request to users favouriteMovies
   */
  addToFavourites(_id: string, Title: string): void {
    this.fetchApiData.addToFavourites(this.user['username'], _id).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been added to your favourites.`, 'OK', {
        panelClass: 'snackBar-class',
        duration: 3000,
      });
    });
  }

  /**
   * Logout user and delete local storage
   */
  logout(): void {
    this.user = [];
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');

    let successMessage = 'Successfully logged out.'
    this.snackBar.open(successMessage, 'OK', {
      panelClass: 'snackBar-class',
      duration: 4000
    });
  }

  /**
 * Navigate to the user-profile 
 */
  viewProfile(): void {
    this.dialog.open(UserProfileComponent, {
      width: '500px',
      height: '600px',
      data: { user: this.user },
    });
  }

  /**
 * Navigate to Desciption-card
 */
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

  /**
 * Navigate to Genre-card
 */
  openGenreCard(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name, description },
      width: '500px',
    });
  }

  /**
   * Navigate to Director-card
   */
  openDirectorCard(name: string, bio: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: { name, bio },
      width: '500px',
    });
  }
}
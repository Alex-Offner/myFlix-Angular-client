/**
 * user-profile lets users eddit, delete or remove movies from their list of favourites
 * @module ProfileEditComponent
 */

import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; // to receive data from move-card
// to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// API calls service
import { ApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  @Input() userData = { username: this.data.user.username, password: '', email: this.data.user.email, birthday: this.data.user.birthday };
  favourites: any[] = [];
  user: any = {};
  movies: any[] = [];

  constructor(
    public fetchApiData: ApiDataService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { user: any }
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Get user from API and call getMovies function
   */
  getUser(): void {
    this.fetchApiData.getUser(this.data.user.username).subscribe((resp: any) => {
      this.user = resp;
      this.getMovies();
      console.log(resp);
      console.log(this.favourites);
    });
  }

  /**
 * Get movies from API
 */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filterFavouirites();
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
 * Filters movie list with list of favourites of a user
 */
  filterFavouirites(): any {
    this.favourites = this.movies.filter((movie: any) =>
      this.user.favouriteMovies.includes(movie._id)
    );
    return this.favourites;
  }

  /**
 * Removes a movie from a users list of favourites
 */
  removeFromFavourites(_id: string, Title: string): void {
    this.fetchApiData.removeFromFavourites(this.user['username'], _id).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been removed from your favourites`, 'OK', {
        duration: 3000,
      });
      window.location.reload();
    });
  }

  /**
 * A put request to change the user data
 */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData.username, this.userData).subscribe((result) => {

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      let successMessage = 'Successfully updated. Please log in again to see the changes you made.';
      this.snackBar.open(successMessage, 'OK', {
        duration: 4000
      });

      this.dialogRef.close();

    }, (result) => {
      console.log(this.userData);
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 4000
      });
    });
  }

  /**
 * Delete a user from the database and remove local storage items
 */
  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe((result) => {

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      let successMessage = 'Sucessfully deleted account. Logging out...'
      this.snackBar.open(successMessage, '', {
        duration: 2000
      });

      setTimeout(() => {
        this.dialogRef.close();
        window.open('/', '_self');
      }, 2000);

    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 4000
      });
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}
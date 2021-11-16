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

  constructor(
    public fetchApiData: ApiDataService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { user: any, favs: any }
  ) { }

  ngOnInit(): void {
    this.getUserFavs();
  }

  getUserFavs(): void {
    this.fetchApiData.getUser().subscribe((res: any) => {
      this.favourites = res.favouriteMovies
      return this.favourites;
    });
    console.log(this.favourites)
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData.username, this.userData).subscribe((result) => {

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      let successMessage = 'Successfully updated.';
      this.snackBar.open(successMessage, 'OK', {
        duration: 4000
      });

      this.dialogRef.close();
      // window.open('/', '_self');

    }, (result) => {
      console.log(this.userData);
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 4000
      });
    });
  }

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
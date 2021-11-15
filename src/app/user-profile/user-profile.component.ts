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

  /**
   * bind form input values to userData object and prefill form fields with data from {@link user}
   */
  @Input() userData = { Username: this.data.user.Username, Password: '', Email: this.data.user.Email, Birthday: (this.data.user.Birthday ? this.data.user.Birthday.split('T')[0] : undefined) };

  /**
    * All constructor items are documented as properties
    * @ignore
  */
  constructor(
    public fetchApiData: ApiDataService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { user: any, favs: any }
  ) { }

  /**
   * update user data on backend, remove user data and token from localStorage, then redirect to {@link WelcomePageComponent}
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      let successMessage = 'Successfully updated. Redirecting to login...';
      this.snackBar.open(successMessage, 'OK', {
        duration: 4000
      });

      this.dialogRef.close();
      window.open('/', '_self');

    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 4000
      });
    });
  }
  /**
   * delete user account in backend and localStorage, then redirect to {@link WelcomePageComponent}
   */
  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe((result) => {

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      let successMessage = 'Sucessfully deleted account. Logging out...' // 'Success: ' + result;
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
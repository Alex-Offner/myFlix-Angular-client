// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { ApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  @Input() userCredentials = { username: '', password: '' };

  constructor(
    public fetchApiData: ApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe((result) => {

      this.dialogRef.close(); // This will close the modal on success. (it is opened in the root component method openUserRegistrationDialog)

      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));

      let successMessage = 'Successfully logged in ' + result.user.username;
      this.snackBar.open(successMessage, 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }


}
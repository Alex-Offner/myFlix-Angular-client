import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const token = localStorage.getItem('token');

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-app-alex-offner.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'An error occured; please try again later or check your username and password.');
  }

  public userLogin(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + 'login', userData).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  getMovie(): Observable<any> {
    return this.http.get(apiUrl + 'movies/:title', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getDirector(directorName: string): Observable<any> {
    const response = this.http.get(
      apiUrl + 'movies/Director/' + directorName,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getGenre(genreName: string): Observable<any> {
    const response = this.http.get(apiUrl + 'movies/Genre/' + genreName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getUser(username: string): Observable<any> {
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getFavorites(username: string): Observable<any> {
    const response = this.http.get(apiUrl + 'users/' + username + '/favouriteMovies/', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  addMovie(MovieID: any): Observable<any> {
    return this.http.get(apiUrl + `users/:username/favouriteMovies/${MovieID}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public editUser(username: string, userData: object): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.put(apiUrl + 'users/' + username, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = JSON.parse(localStorage.getItem('user') || '{}').username;
    return this.http.delete(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }), responseType: 'text' as const
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  addToFavourites(user: any, _id: string): Observable<any> {
    return this.http.post(apiUrl + `users/${user}/favouriteMovies/${_id}`, _id, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  removeFromFavourites(user: any, _id: string): Observable<any> {
    return this.http.delete(apiUrl + `users/${user}/favouriteMovies/${_id}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }
}
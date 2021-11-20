# MyFlixAngularClient

This project is a second client for the myFlix application. It was written in Angular (while the first installment was written with React). It access an existing server-side, including a database and REST API, hosted on Heroku. For further information on the API look at this [GitHub repository](https://github.com/Alex-Offner/movie_api). 

![](src/assets/myFlix-angular.gif)


## Tech Stack

- Angular
- Angular Meterial
- Mongo DB
- Express
- Node

## Key Features

- Upon opening the app the user will see a Welcome View than enables him to login, or create a user profile.
- After logging in and authorisation the user will be redirected to a view of all movies available. 
- Each movie has optional buttons to display it's decription, genre, director and an option to add the movie to their list of favourites. 
- The user is will see a navbar at the top where he can select and see his user profile. All user data (except the password) is displayed here and can be changed. A list of all favourites movies can be seen here as well and they can be deleted. A button to delete the current user profile is available. 


## Installing and running the app locally 

- Download the code and run `npm install` to install all dependencies
- Run `ng serve` in the project directory and navigate to `http://localhost:4200` in your browser to open the app. 
- Run `ng build` to build the project. 


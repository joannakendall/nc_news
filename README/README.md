# NC news - Joanna Kendall

https://nc-news-joanna-kendall.herokuapp.com

NC News is a server with data for topics, articles, users, and comments. The server has multiple purposes including allowing the user to get the articles, post comments and search for specific authors and so on. It is created using express, PSQL and knex.


## Getting Started

Please follow the instructions to get the project up and running for testing and development.


## Set Up

Clone data onto local machine:

``` git clone https://github.com/joannakendall/nc_news ```

``` cd nc-news-joanna-kendall ```

Install node dependencies, the dependencies can be found in the package.json file:

``` npm install ```

Seed the database:

``` npm run setup-dbs ```

```npm run seed```

Start running the server:

```npm run start```

## Using the API 
Below is a full list of available endpoints:

### /api/
* **GET** ```/api/```

### /api/topics
* **GET** ```/api/topics```
* **POST** ```/api/topics```

### /api/users
* **GET** ```/api/users```
* **POST** ```/api/users```
* **GET** ```/api/users/:username```

### /api/articles
* **GET** ```/api/articles```
* **POST** ```/api/articles```

### /api/comments
* **PATCH** ```/api/comments/:comment_id```
* **DELETE** ```/api/comments/:comment_id```

### /api/articles/:article_id ###
* **GET** ```/api/articles/:article_id```
* **PATCH** ```/api/articles/:article_id```
* **DELETE** ```/api/articles/:article_id```
* **GET** ```/api/articles/:article_id/comments```
* **POST** ```/api/articles/:article_id/comments```



## Running tests
All tests are found in the spec file. Testing for the endpoints of the server can be found in the app.spec.js file. Ensure *mocha* and *chai* have been installed as dependencies before taking this step:
```npm test```
To test the utility functions found in the utils.spec.js file. These functions are for the purpose of formatting data:
```npm run test-utils```

## Built With
*	Mocha
*	Chai
*	Supertest
*   Node.JS
*	Express
*	Knex
*	PostgreSQL


## Author 
Joanna Kendall

## Acknowledgments
Thank you to the Manchester Northcoders Team.
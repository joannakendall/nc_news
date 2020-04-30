# Feedback

## Human Output

Great job overall!

- Using `text` in your migrations rather than `string` works well but always for unlimited length text to be stored, which takes up a lot more memory than we need. `string` defaults to 255 (though you can change it) which is usually enough for this project. Your call tho, no biggy!

- Make sure to delete our commented out instructions in the seed files/ get rid of old instruction files of ours!

- Adding notNullable on your migrations will help lots of your errors as the db will throw an error for you when posting

- When posting, also and a test to check that the created_at key is a timestamp (at the moment it's not as you'd need to add a default into the migrations :) )

### Checklist

## Chores/Readme

- [ ] Link to hosted version
- [ ] Write a summary of what the project is
- [ ] Provide clear instructions of how to clone, install dependencies, seed local database, and run tests
- [ ] Include information about how to create `knexfile.js`
- [ ] Specify minimum versions of `Node.js` and `Postgres` needed to run the project
- [ ] Remove any unnecessary `console.logs` and comments
- [ ] Remove all unnecessary files (e.g. old `README.md`, `error-handling.md`, `hosting.md`, `./db/utils/README.md` etc.)

## Migrations

- [ ] Use `notNullable` on required fields
- [ ] Default `created_at` in articles and comments tables to the current date:`.defaultTo(knex.fn.now());`
- [ ] Delete all comments when the article they are related to is deleted: Add `.onDelete("CASCADE");` to `article_id` column in `comments` table. **ONLY NEEDED IF YOU DO THE 'delete article' endpoint**

## Seeding

- [x] Make sure util functions do not mutate data
- [x] Make util functions easy to follow with well named functions and variables
- [x] Test util functions **Lovely tests!**
- [x] Migrate rollback and migrate latest in seed function
- [ ] Make sure to delete our comments

## Tests

- [ ] Cover all endpoints and errors
- [ ] Ensure all tests are passing

## Routing

- [x] Split into api, topics, users, comments and articles routers
- [x] Use `.route` for endpoints that share the same path **mostly - a few have just get and i'd be consistent but not a big deal :)**
- [ ] Use `.all` for 405 errors

## Controllers

- [x] Name functions and variables well
- [x] Add catch blocks to all model invocations (and don't mix use of`.catch(next);` and `.catch(err => next(err))`) **except sendTopics**

## Models

- [ ] Consistently use either single object argument _**or**_ multiple arguments in model functions - **Some differences in object vs multiple e.g. sendArticles**
- [x] No unnecessary use of `.modify()` (i.e. only for author and topic queries)
- [ ] Use `leftJoin` for comment counts **Need to use for getArticle too otherwise you won't get a comment_count for those with 0 comments :)**

## Errors

- [x] Use error handling middleware functions in app and extracted to separate directory/file
- [x] Consistently use `Promise.reject` in either models _**OR**_ controllers

## Test Output

### PATCH `/api/topics`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### GET `/api/articles?author=butter_bridge`

Assertion: all articles should be by the author in the query: expected [ Array(12) ] to satisfy [Function]

Hints:

- accept an `author` query of any author that exists in the database
- use `where` in the model

### GET `/api/articles?topic=mitch`

Assertion: all articles should be by the topic in the query: expected [ Array(12) ] to satisfy [Function]

Hints:

- accept an `topic` query of any topic slug that exists in the database
- use `where` in the model

### GET `/api/articles?author=lurker`

Assertion: expected [ Array(12) ] to deeply equal []

Hints:

- give a 200 status and an empty array when articles for a topic that does exist, but has no articles is requested
- use a separate model to check whether the user exists

### GET `/api/articles?topic=paper`

Assertion: expected [ Array(12) ] to deeply equal []

Hints:

- give a 200 status and an empty array when articles for a topic that does exist, but has no articles is requested
- use a separate model to check whether the topic exists

### GET `/api/articles?topic=not-a-topic`

Assertion: expected 200 to equal 404

Hints:

- use a 404 status code, when provided a non-existent topic
- use a separate model to check whether the topic exists

### GET `/api/articles?author=not-an-author`

Assertion: expected 200 to equal 404

Hints:

- use a 404 status code, when provided a non-existent author
- use a separate model to check whether the author exists

### GET `/api/articles?sort_by=not-a-column`

Assertion: **ERROR WITH NO CATCH: CHECK YOUR CONTROLLERS!**

### PATCH `/api/articles`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### GET `/api/articles/2`

Assertion: Cannot read property 'votes' of undefined

Hints:

- default the vote column to `0` in the migration
- article with article_id 2 has no comments, you may need to check your join

### PUT `/api/articles/1`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### PATCH `/api/articles/1`

Assertion: expected 101 to equal 100

Hints:

- ignore a `patch` request with no information in the request body, and send the unchanged article to the client
- provide a default argument of `0` to the `increment` method, otherwise it will automatically increment by 1

### GET `/api/articles/1/comments?sort_by=votes`

Assertion: expected 2 to equal 3

Hints:

- accept a `sort_by` query of any valid column
- order should default to `DESC`

### GET `/api/articles/1/comments?order=asc`

Assertion: expected 2 to equal 18

Hints:

- accept an `order` query of `asc` or `desc`
- `sort_by` should default to `created_at`

### GET `/api/articles/1000/comments`

Assertion: expected 200 to equal 404

Hints:

- return 404: Not Found when given a valid `article_id` that does not exist

### GET `/api/articles/not-a-valid-id/comments`

Assertion: **ERROR WITH NO CATCH: CHECK YOUR CONTROLLERS!**

### PUT `/api/articles/1/comments`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### POST `/api/articles/1/comments`

Assertion: expected null to be a string

Hints:

- default `votes` to `0` in the migrations
- default `created_at` to the current time in the migrations

### POST `/api/articles/1/comments`

Assertion: expected 201 to equal 400

Hints:

- use a 400: Bad Request status code when `POST` request does not include all the required keys
- use `notNullable` in migrations for required columns

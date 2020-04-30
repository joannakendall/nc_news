process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest');
const chai = require('chai');
const {expect} = chai
chai.use(require('chai-sorted'))
const connection = require('../db/connection')

beforeEach(() => connection.seed.run());
after(() => connection.destroy())

describe('/api', () => {
    it('returns status code 404 for an invalid path', () => {
        return request(app)
        .get("/invalid-path")
        .expect(404)
        .then(({ body: {msg}}) => {
            expect(msg).to.equal('Path Not Found');
        });
    });
    describe('/topics', () => {
        it('GET 200: - responds with an array of topic objects', () => {
            return request(app)
                .get('/api/topics').
                expect(200).then((res) => {
                res.body.topics.forEach(topic => {
                    expect(topic).to.have.all.keys(['slug', 'description'])
                    expect(topic).to.be.an('object');
                })
            }) 
        })
        it('INVALID METHODS 405 - responds with Method Not Allowed', () => {
            const invalidMethods = ['delete', 'post', 'put', 'patch'];
            const requests = invalidMethods.map((method) => {
                return request(app)
                    [method]('/api/topics')
                    .expect(405)
                    .then((res) => {
                        expect(res.body.msg).to.equal('Method Not Allowed');
                    })
            })
            return Promise.all(requests);
        })
    })
    describe('/users/:username', () => {
        it('GET 200 - returns the requested user from the query', () => {
             return request(app)
             .get('/api/users/butter_bridge')
             .expect(200)
             .then(({body: {user}}) => {
                 expect(user).to.eql({
                    username: 'butter_bridge',
                    name: 'jonny',
                    avatar_url: 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
                 })
             })           
        })
        it('404 Path Not Found for invalid username', () => {
            return request(app)
                .get('/api/users/invalid-username')
                .expect(404)
                .then(({ body: { msg }}) => {
                   expect(msg).to.equal('User Not Found');
                });
        });
        it('INVALID METHODS 405 - responds with Method Not Allowed', () => {
            const invalidMethods = ['delete','post' , 'put', 'patch'];
            const requests = invalidMethods.map((method) => {
                return request(app)
                    [method]('/api/users/butter_bridge')
                    .expect(405)
                    .then((res) => {
                        expect(res.body.msg).to.equal('Method Not Allowed');
                    })
            })
            return Promise.all(requests);
        })
    })
    describe('/articles/:article_id', () => {
        it('GET 200 - responds with the requested article from the query', () => {
            return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then(({body: {article}}) => {
                 expect(article).to.eql({
                    article_id: 1,
                    title: 'Living in the shadow of a great man',
                    topic: 'mitch',
                    author: 'butter_bridge',
                    body: 'I find this existence challenging',
                    created_at: '2018-11-15T12:21:54.171Z',
                    votes: 100,
                    comment_count: "13"
                  })
             })
        })
        it('GET 200 - should have a comment count property', () => {
            return request(app)
                .get('/api/articles/1')
                .expect(200)
                .then(({ body: { article }}) => {
                    expect(article.comment_count).to.equal('13')
                })
        })
        it('GET 404 Path Not Found for invalid id', () => {
            return request(app)
                .get('/api/articles/10000')
                .expect(404)
                .then(({ body: { msg }}) => {
                   expect(msg).to.equal('Article Not Found');
                });
        })
        it('GET 400 Invalid Path for id not a number', () => {
            return request(app)
            .get('/api/articles/invalid')
            .send({ inc_votes : 1 })
            .expect(400)
            .then(({ body }) => {
               expect(body.msg).to.equal('Bad Request');
            });
        })
        it('PATCH 200 - returns article with updated vote', () => {
            return request(app)
                .patch('/api/articles/1')
                .send({ inc_votes : 1 })
                .expect(200)
                .then(({ body }) => {
                    expect(body.article.votes).to.equal(101);
                })
        })
        it('PATCH 400 Invalid Path for id not a number', () => {
            return request(app)
            .patch('/api/articles/invalid')
            .send({ inc_votes : 1 })
            .expect(400)
            .then(({ body }) => {
               expect(body.msg).to.equal('Bad Request');
            });
        })
        it('GET 400 Invalid Path for id not a number', () => {
            return request(app)
            .patch('/api/articles/invalid')
            .send({ inc_votes : 1 })
            .expect(400)
            .then(({ body }) => {
               expect(body.msg).to.equal('Bad Request');
            });
        })
        it('INVALID METHODS 405 - responds with Method Not Allowed', () => {
            const invalidMethods = ['delete','post' , 'put'];
            const requests = invalidMethods.map((method) => {
                return request(app)
                    [method]('/api/articles/2')
                    .expect(405)
                    .then((res) => {
                        expect(res.body.msg).to.equal('Method Not Allowed');
                    })
            })
            return Promise.all(requests);
        })
    })
    describe('/articles/:article_id/comments', () => {
        it('POST 201 posts a new comment to the requested article', () => {
            return request(app)
                .post('/api/articles/1/comments')
                .send({
                        username: "butter_bridge",
                        body: "new comment"
                    })
                .expect(201)
                .then((res) => {
                    expect(res.body.comment).to.have.all.keys(['comment_id', 'author', 'article_id', 'votes', 'created_at', 'body'])
                })
        })
        it('GET 200 returns all comments for the requested article', () => {
            return request(app)
                .get('/api/articles/1/comments')
                .expect(200)
                .then((res) => {
                    res.body.comments.forEach(comment => {
                        expect(comment).to.have.all.keys(['comment_id', 'author', 'votes', 'created_at', 'body'])
                    })
                    expect(res.body.comments.length).to.equal(13)
                })
        })
        describe('200 GET queries', () => {
            it('sort_by query default to created_at and order default to desc', () => {
                return request(app)
                    .get('/api/articles/1/comments')
                    .expect(200)
                    .then((res) => {
                        expect(res.body.comments).to.be.descendingBy('created_at')
                    })
            })
            it('accepts a sort_by and order query that is not the default', () => {
                return request(app)
                    .get('/api/articles/1/comments?sort_by=comment_id&order=asc')
                    .expect(200)
                    .then((res) => {
                        expect(res.body.comments).to.be.ascendingBy('comment_id')
                    })
            })
        })
        it('INVALID METHODS 405 - responds with Method Not Allowed', () => {
            const invalidMethods = ['delete','patch', 'put'];
            const requests = invalidMethods.map((method) => {
                return request(app)
                    [method]('/api/articles/2/comments')
                    .expect(405)
                    .then((res) => {
                        expect(res.body.msg).to.equal('Method Not Allowed');
                    })
            })
            return Promise.all(requests);
        })
    })
    describe.only('/articles', () => {
        it('GET 200 sends all articles', () => {
            return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({body: {articles}}) => {
                expect(articles.length).to.equal(12)
                 articles.forEach((article) => {
                     expect(article).to.have.all.keys(['title',
                    'article_id',
                    'topic',
                    'created_at', 
                    'votes',
                    'comment_count',
                    'author', 
                    'body'])
                 })   
             })
        })
        it('GET 200 each article should have a comment_count property', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then(({ body: {articles}}) => {
                    expect(articles[0].comment_count).to.equal('13')
                })
        })
        describe('queries for GET 200', () => {
            it('default sort_by date, order default to desc', () => {
                return request(app)
                    .get('/api/articles')
                    .expect(200)
                    .then(({ body: { articles }}) => {
                        expect(articles).to.be.descendingBy('created_at')
                    })
            })
            it('accepts a sort_by query that is not the default and responds with the articles sorted by article_id', () => {
                return request(app)
                    .get('/api/articles?sort_by=article_id')
                    .expect(200)
                    .then((res) => {
                        expect(res.body.articles).to.be.sortedBy('article_id', {descending: true})
                    })
            })
            it('accepts an order query and responds with the articles in the given order', () => {
                return request(app)
                    .get('/api/articles?order=asc')
                    .expect(200)
                    .then((res) => {
                        expect(res.body.articles).to.be.ascendingBy('created_at');
                    })
            })
            it
            ('accepts an author query and responds with the requested articles', () => {
                return request(app)
                    .get('/api/articles?author=butter_bridge')
                    .expect(200) 
                    .then(res => {
                        expect(res.body.articles.length).to.equal(3)
                    })
            })
            it('accepts a topics query and response with the requested articles', () => {
                return request(app)
                    .get('/api/articles?topic=mitch')
                    .expect(200) 
                    .then(res => {
                        expect(res.body.articles.length).to.equal(11)
                })
            })
        })
        describe('query errors', () =>{
            it('404 Order not Found for invalid order query', () => {
                return request(app)
                    .get('/api/articles?order=invalid')
                    .expect(404)
                    .then(({ body: { msg }}) => {
                        expect(msg).to.equal('Order not Found');
                 })  
            })
            it.only('404 Column not Found if invalid sort_by query', () => {
                return request(app)
                    .get('/api/articles?sort_by=invalid')
                    .expect(404)
                    .then(({ body: { msg }}) => {
                        expect(msg).to.equal('Column not Found');
                 })
            })
        })
        it('INVALID METHODS 405 - responds with Method Not Allowed', () => {
            const invalidMethods = ['delete','patch', 'put', 'post'];
            const requests = invalidMethods.map((method) => {
                return request(app)
                    [method]('/api/articles')
                    .expect(405)
                    .then((res) => {
                        expect(res.body.msg).to.equal('Method Not Allowed');
                    })
            })
            return Promise.all(requests);
        })
    })
    describe('/comments/:comment_id', () => {
        it('PATCH 200 - returns a comment with an updated vote', () => {
            return request(app)
                .patch('/api/comments/1')
                .send({ inc_votes : 1 })
                .expect(200)
                .then(({ body }) => {
                    expect(body.comment.votes).to.equal(17);
                })
        })
        it('PATCH 404 for invalid comment id', () => {
            return request(app)
                .patch('/api/comments/10000')
                .send({ inc_votes : 1 })
                .expect(404)
                .then(({ body }) => {
                   expect(body.msg).to.equal('Comment Not Found');
                });
        })
        it('PATCH 400 Bad Request comment id not a number', () => {
            return request(app)
            .patch('/api/comments/invalid')
            .send({ inc_votes : 1 })
            .expect(400)
            .then(({ body }) => {
               expect(body.msg).to.equal('Bad Request');
            });
        })
        it('DELETE 204 deletes the requested comment', () => {
            return request(app)
                .delete('/api/comments/2')
                .expect(204)
                .then(({ body }) => {
                    return connection('comments').where({ comment_id: 2})
                })
                .then(comment => {
                    expect(comment.length).to.equal(0);
                });
        })
        it('DELETE 404 invalid comment id', () => {
            return request(app)
                .del('/api/comments/10000')
                .send({ inc_votes : 1 })
                .expect(404)
                .then(({ body }) => {
                   expect(body.msg).to.equal('Comment Not Found');
                });
        })
        it('DELETE 400 Bad Request comment_id not a number', () => {
            return request(app)
            .del('/api/comments/invalid')
            .send({ inc_votes : 1 })
            .expect(400)
            .then(({ body }) => {
               expect(body.msg).to.equal('Bad Request');
            });
        })
        it('INVALID METHODS 405 - responds with Method Not Allowed', () => {
            const invalidMethods = ['get', 'put', 'post'];
            const requests = invalidMethods.map((method) => {
                return request(app)
                    [method]('/api/comments/2')
                    .expect(405)
                    .then((res) => {
                        expect(res.body.msg).to.equal('Method Not Allowed');
                    })
            })
            return Promise.all(requests);
        })
    })
})
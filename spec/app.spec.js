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
            return request(app).get('/api/topics').expect(200).then((res) => {
                res.body.topics.forEach(topic => {
                    expect(topic).to.have.all.keys(['slug', 'description'])
                    expect(topic).to.be.an('object');
                })
            }) 
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
    })
    // describe('/articles/:article_id/comments', () => {
    //     it('POST 201 posts a new comment to the requested article', () => {
    //         return request(app)
    //             .post('/articles/1/comments')
    //             .send({})
    //             .expect(201)
    //             .then((res) => {
    //                 console.log(res)
    //                 expect(res.body.comment).to.have.all.keys(['username', 'body'])
    //             })
    //     })
    // })
    describe('/articles', () => {
        it('GET 200 sends all articles', () => {
            return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({body: {articles}}) => {
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
        it('GET 200 default sort_by article_id', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then(({ body: { articles }}) => {
                    expect(articles).to.be.ascendingBy('articles_id')
                })
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
    })
})
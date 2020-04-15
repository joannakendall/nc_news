process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest');
const chai = require('chai');
const {expect} = chai
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
                 expect(user).to.eql([{
                    username: 'butter_bridge',
                    name: 'jonny',
                    avatar_url: 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
                  }])
             })           
        })
    })
})
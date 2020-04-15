process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest');
const chai = require('chai');
const {expect} = chai
const connection = require('../db/connection')

beforeEach(() => {
    connection.seed.run();
})
after(() => connection.destroy())

describe('/api', () => {
    describe('/topics', () => {
        it('GET 200: - responds with an array of topic objects', () => {
            return request(app).get('/api/topics').expect(200).then((res) => {
                res.body.topics.forEach(topic => {
                    expect(topic).to.have.all.keys(['slug', 'description'])
                })
            }) 
        })
    })
})
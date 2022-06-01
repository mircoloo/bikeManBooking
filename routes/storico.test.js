const app = require('./storico')
const request = require('supertest')
const mongoose = require('mongoose')

test('GET /storico/ should return json', () => {
    request(app).get('/storico')
        .expect('Content-Type', /json/)
        .expect(200)
})
const app = require('./calendarioM')
const request = require('supertest')
const mongoose = require('mongoose')


test('GET /calendario/prenotazioni should return json', () => {
    request(app).get('/prenotazioni')
        .expect('Content-Type', /json/)
        .expect(200)
})
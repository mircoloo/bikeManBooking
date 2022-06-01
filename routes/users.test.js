const auth = require('./auth')
const users = require('./users');
const request = require('supertest')
const mongoose = require('mongoose');
const User = require('../models/user');

describe('TEST /api/v1/users', () => {
    
   
    test('GET tutte le prenotazioni', () => {
        return request(users).get('/getAll')
            .expect('Content-Type', /json/)
            .expect(204)
    })
})
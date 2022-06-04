const app = require('./calendarioU')
const request = require('supertest')
const mongoose = require('mongoose')

test('GET /calendario/prenotazioni should return json', () => {
    request(app).get('/calendario')
        .expect('Content-Type', /json/)
        .expect(200)
})

// per ora il test non è corretto, da aggiornare  
test('GET /calendario/May 30 should return reservation table row stef@gang.it - tagliando - canyon ', () => {
    request(app).get('/calendario?data=2022-05-30')
        .expect('Content-Type', /json/)
        .expect(200)
})

// da aggiungere test di creazione nuova prenotazione
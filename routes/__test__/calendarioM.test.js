const pren = require('../calendario').getPrenotazioni
const app = require('../calendario').router
const request = require('supertest')
const mongoose = require('mongoose')
const fetch = require('node-fetch')
const jwt = require('../jwt')

describe('GET app server must be running', () => {
    let baseUrl = 'http://localhost:3000'

    let token = jwt.setToken('meccanico@email.it')
    const opts = {
        headers: {
            cookie: 'token=' + token + ';'
        }
    }

    test('GET getPrenotazioni should return three items on 2022-05-29', async () => {
        await fetch(baseUrl + '/calendario/prenotazioni?data=2022-05-29', opts)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                expect(data.prenotazione.length).toEqual(3)
            })

    })
})

test('app module should be defined', () => {
    return expect(app).toBeDefined();
});
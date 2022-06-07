const app = require('../calendario').router
const pren = require('../calendario').getPrenotazioni
const request = require('supertest')
const mongoose = require('mongoose')
const fetch = require('node-fetch')
const jwt = require('../jwt')

describe('GET app server must be running', () => {
    let baseUrl = 'http://localhost:3000'

    let token = jwt.setToken('stef@gang.it')

    test('GET getPrenotazioni should return one item on 2022-05-30', async () => {
        await fetch(baseUrl + '/calendario/prenotazioni?data=2022-05-30', {
            headers: {
                cookie: 'token=' + token + ';'
            }
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                expect(data.prenotazione.length).toEqual(2)
            })

    })

    test("POST should fail, date must be at least <tomorrow>", async () => {
        await fetch(baseUrl + '/calendario/', {
            method: 'POST',
            body: JSON.stringify({
                data: "2020-05-29",
                utente: "asd",
                problema: "yes",
                bici: "nessuna",
            }),
            headers: {
                'Content-Type': 'application/json',
                cookie: 'token=' + token + ';'
            }
        }).then((res) => {
            expect(res.status).toBe(400)
        })
    })
})
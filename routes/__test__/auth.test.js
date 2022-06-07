const app = require('../auth')
const request = require('supertest')
const mongoose = require('mongoose')
const fetch = require('node-fetch')
const jwt = require('../jwt')

describe('POST login', () => {
    let baseUrl = 'http://localhost:3000'

    test("POST login fail, incorrect password", async () => {
        await fetch(baseUrl + '/api/v1/authenticate', {
            method: 'POST',
            body: JSON.stringify({
                email: "meccanico@email.it",
                password: "12345678",
                submit: "Accedi",
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            expect(res.status).toBe(401)
        })
    })
    test("POST login successful, correct password", async () => {
        await fetch(baseUrl + '/api/v1/authenticate', {
            method: 'POST',
            body: JSON.stringify({
                email: "s@gmail.com",
                password: "12345678",
                submit: "Accedi",
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            expect(res.status).toBe(200)
        })
    })
})

describe('POST register', () => {
    let baseUrl = 'http://localhost:3000'

    test("POST register fail, password too short", async () => {
        await fetch(baseUrl + '/api/v1/authenticate', {
            method: 'POST',
            body: JSON.stringify({
                email: "my@new.mail",
                password: "asd",
                submit: "Registrati",
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            expect(res.status).toBe(400)
        })
    })
    test("POST register fail, alredy exists", async () => {
        await fetch(baseUrl + '/api/v1/authenticate', {
            method: 'POST',
            body: JSON.stringify({
                email: "s@gmail.com",
                password: "12345678",
                submit: "Registrati",
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            expect(res.status).toBe(400)
        })
    })
})
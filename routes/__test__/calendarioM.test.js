const pren = require('../calendario').getPrenotazioni
const app = require('../calendario').router
const request = require('supertest')
const mongoose = require('mongoose')

describe('GET ', () => {

    let connection
    beforeAll(async () => {
        jest.setTimeout(8000)
        connection = await mongoose.connect(process.env.DATABASE_URL)
    });
    afterAll(() => { mongoose.connection.close(true) })

    test('GET getPrenotazioni should three items on 2022-05-29', async () => {
        const response = await pren('2022-05-29', 'day')
        expect(response.length).toBe(3)
    })
})

test('app module should be defined', () => {
    return expect(app).toBeDefined();
});
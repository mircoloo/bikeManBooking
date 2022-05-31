const request = require('supertest');
const app = require("./index.js")

test('GET / should return 200', () => {
    return request(app)
        .get('/')
        .expect(200);
});
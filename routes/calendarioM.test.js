const app = require('./calendarioM')
const request = require('supertest')

test('GET / should return 200', () => {
    return request(app)
        .get('/')
        .expect(200)
})

/*describe('GET /calendarioM', () => {
    beforeAll(async () => {
        jest.setTimeout(8000);
        app.locals.db = await mongoose.connect(process.env.DB_URL);
    });
    afterAll(() => { mongoose.connection.close(true); });
    var token = jwt.sign({ email: 'John@mail.com' },
        process.env.SUPER_SECRET, { expiresIn: 86400 }); // create a valid token
    test('POST /api/v1/booklendings with Student not specified', () => {
        return request(app).post('/api/v1/booklendings')
            .set('x-access-token', token).set('Accept', 'application/json')
            .expect(400, { error: 'Student not specified' });
    });*/


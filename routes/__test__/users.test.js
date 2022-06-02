const auth = require('../auth')
const users = require('../users');
const request = require('supertest')
require('../../scripts/dbConnection');
const User = require('../../models/user');

describe('TEST /api/v1/users', () => {
   
    test('Get a user', async () => {
        
        const expected = 'test@gmail.it';
        const user = await User.findOne({email: 'test@gmail.it'})
        const actual = user.email
        
        expect(actual)
        .toEqual(expected);
    });

    test('Delete a user', async () => {
        const user = User({email: 'testDeleted@gmail.it', password: '123'});
        await user.save()
        await User.findOne({email: "testDeleted@gmail.it"}).remove()
        const expected = undefined;
        const actual = await User.findOne({email: 'testDeleted@gmail.it'})
        
        expect(actual)
        .toEqual(null);
    }); 
   
    
    
});
const mongoose = require('mongoose')
require('dotenv').config()

// conenect to mongoDB
const dbURI = process.env.DATABASE_URL
const localURI = "mongodb://localhost:27017/isDB"
mongoose.connect(dbURI)
    .then((result) => {
        console.log('connected to db')
    })
    
    .catch((err) => {
        console.log(err)
    });

module.exports = 'db'
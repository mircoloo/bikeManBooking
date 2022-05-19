const mongoose = require('mongoose')
require('dotenv').config()

// conenect to mongoDB
const dbURI = process.env.DATABASE_URL
const localURI = "mongodb://localhost:27017/isDB"
try{
    mongoose.connect(localURI)
    console.log('connected to db');
}catch(error){
    console.log(error)
}
module.exports = 'db'
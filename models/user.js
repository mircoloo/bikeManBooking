
const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({ 
    email: {type: String, required: true},
    password: {type: String, required: true},
    nome:  {type: String,},
    cognome:  {type: String,},
    bikes: [String],
    ebikes: [String],
    telefono: {type: String},
    indirizzo: String,
    client: Boolean
}, {collection: "users"});

module.exports = mongoose.model('User', userSchema)

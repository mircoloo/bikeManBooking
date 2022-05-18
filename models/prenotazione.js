const mongoose = require('mongoose')

const prenotazioneShema = new mongoose.Schema({
    /*id: {
        type: Int16Array,
        required: true
    },*/  
    data: {
        type: Date, 
        //default: Date.now,
        min: Date.now,
        max: '2030-01-01',
        required: true
    },
    utente: {
        type: String,
        required: true
    },
    problema: {
        type: String,
        required: true
    },
    bici: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Prenotazione', prenotazioneShema)
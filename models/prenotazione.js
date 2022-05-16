const mongoose = require('mongoose')

const prenotazioneShema = new mongoose.Schema({
    data: {
        type: Date,
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
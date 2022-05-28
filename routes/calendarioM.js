const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const Prenotazione = require('../models/prenotazione')

// adesso la ricerca per data funziona correttamente, bisogna pulire il codice

// <input type="date" name="data" value="<%= prenotazione.data %>"></input> 
// 
// Pagina che permette di selezionare la data
router.get('/', async (req, res) => {
    let sO = {}
    if (req.query.data != null && req.query.data !== '') {
        sO.data = String(new RegExp(req.query.data))
    } else {
        sO.data = new Date().toISOString().slice(0,10)
    }
    try {
        if (sO.data.endsWith('/'))
            sO.data = sO.data.slice(0, -1)
        if (sO.data.startsWith('/'))
            sO.data = sO.data.slice(1,)

        const prenotazioni = await Prenotazione.find(sO) // filtra sulla data

        res.render('calendarioM/index', { 
            prenotazione : prenotazioni, 
            searchOptions: sO
        })
    } catch {
        res.send('error ')
    }
})

module.exports = router
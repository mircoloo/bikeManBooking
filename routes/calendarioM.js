const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const Prenotazione = require('../models/prenotazione')

// adesso la ricerca per data funziona correttamente, bisogna pulire il codice

// <input type="date" name="data" value="<%= prenotazione.data %>"></input> 
// 
// Pagina che permette di selezionare la data
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.data != null && req.query.data !== '') {
        searchOptions.data = String(new RegExp(req.query.data))
    } else {
        searchOptions.data = String(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()) //
    }
    try {
        if (searchOptions.data.endsWith('/'))
            searchOptions.data = searchOptions.data.slice(0, -1)
        if (searchOptions.data.startsWith('/'))
            searchOptions.data = searchOptions.data.slice(1,)

        const prenotazioni = await Prenotazione.find(searchOptions) // filtra sulla data

        res.render('calendarioM/index', { 
            prenotazione : prenotazioni, 
            searchOptions: req.query
        })
    } catch {
        res.send('error ')
    }
})

module.exports = router
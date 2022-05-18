const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const Prenotazione = require('../models/prenotazione')

// <input type="date" name="data" value="<%= prenotazione.data %>"></input> 
// 
// Pagina che permette di selezionare la data
router.get('/', async (req, res) => {
    let searchOptions = {}
    if(req.query.data != null && req.query.data !== ''){
        searchOptions.data = new RegExp(req.query.data)
    }
    /*if(req.query.utente != null && req.query.utente !== ''){
        searchOptions.utente = new RegExp(req.query.utente, 'i')
    }*/
    try{
        const prenotazioni = await Prenotazione.find(searchOptions) // filtrare sulla data
        res.render('calendarioM/index', { 
            prenotazione : prenotazioni, 
            searchOptions: req.query
        })
    } catch {
        res.send('error ')
    }
})


/*
router.get('/:dataPrenotazione', async (req, res) => {
    try{
        const prenotazioni = await Prenotazione.find({}) // filtrare sulla data
        res.render('calendarioM/index', { prenotazione : prenotazioni })
    } catch {
        res.send('error ')
    }
})
*/
module.exports = router
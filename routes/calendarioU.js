const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const Prenotazione = require('../models/prenotazione')


router.get('/', async(req, res) => {
    let searchOptions = {}
    if(req.query.data != null && req.query.data !== ''){
        searchOptions.data = String(new RegExp(req.query.data))
    } else {
        searchOptions.data = String(new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()) //
    }
    try{
        searchOptions.data = searchOptions.data.endsWith('/') ? searchOptions.data.slice(0, -1) : searchOptions.data
        searchOptions.data = searchOptions.data.startsWith('/') ? searchOptions.data.slice(1, ) : searchOptions.data
        const prenotazioni = await Prenotazione.find(searchOptions) 
        
        res.render('calendarioU/index', { 
            prenotazione : prenotazioni, 
            searchOptions: req.query
        })
    } catch {
        res.send('error ')
    }
})

router.get('/prenota', async (req, res) => {
    try{
        res.render('calendarioU/prenota' , { prenotazione : new Prenotazione()})
    } catch {
        res.send('errore nel caricamento della pagina calendario')
    }
})

router.post('/prenota', async (req, res) => {
    const pren = new Prenotazione({
        data: req.body.data,
        utente: req.body.utente,
        problema: req.body.problema,
        bici: req.body.bici
    })
    try{
        const newPrenotazione = await pren.save()
        res.render('calendarioU/created' , { prenotazione : newPrenotazione})
    } catch {
        res.render('calendarioU/error')
    }
})

module.exports = router
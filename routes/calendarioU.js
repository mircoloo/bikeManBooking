const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const Prenotazione = require('../models/prenotazione')

router.get('/', async (req, res) => {
    try{
        res.render('calendarioU/index' , { prenotazione : new Prenotazione()})
    } catch {
        res.send('errore nel caricamento della pagina calendario')
    }
})

router.post('/', async (req, res) => {
    const pren = new Prenotazione({
        data: req.body.data,
        utente: req.body.utente,
        problema: req.body.problema,
        bici: req.body.bici
    })
    try{
        const newPrenotazione = await pren.save()
        res.render('calendario/')
        //res.send(req.body)
    } catch {
        res.send('errore')
    }
})

module.exports = router
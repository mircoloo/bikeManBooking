const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const Prenotazione = require('../models/prenotazione')
/*
    per ora lo storico si occupa solo di fare una get di tutte
    le prenotazioni associate ad un utente di id=x
*/

// metodo temporaneo solo per fare prove di aggiunta di prenotazione
router.get('/new', (req, res) => {
    res.render('storico/new', { prenotazione : new Prenotazione()})
})

router.post('/', async (req, res) => {
    const pren = new Prenotazione({
        data: req.body.data,
        utente: req.body.utente,
        problema: req.body.problema,
        bici: req.body.bici
    })
    try{
        //const newPrenotazione = await pren.save()
        res.render('storico/')
        //res.redirect('/')
        //res.send(req.body)
    } catch {
        res.send('errore')
        /*
        dres.render('storico/', {
            pren : pren,
            errorMessage: 'Errore nella creazione della prenotazione'
        })
        */
    }
})

//
router.get('/', async (req, res) => {
    try{
        const prenot = await Prenotazione.find({})
        //res.render('storico/index', { prenotazione: prenotazione })
        res.render('storico/index')
    } catch {
        res.send('errore nel caricamento della pagina storico')
        //res.redirect('/')
    }
})
    
module.exports = router
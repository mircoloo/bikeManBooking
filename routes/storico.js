const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const Prenotazione = require('../models/prenotazione')

router.get('/', async (req, res) => {
    let searchOptions = {}
    if(req.query.utente != null && req.query.utente !== ''){
        searchOptions.utente = new RegExp(req.query.utente)
    }
    try{
        const prenot = await Prenotazione.find(searchOptions)
        res.render('storico/index', { 
            prenotazione : prenot, 
            searchOptions: req.query
        })
    } catch {
        res.send('error ')
    }
})

router.delete('/:data', async (req, res) => {
    let pren
    try{  
        pren = await Prenotazione.findOne(req.params)   

        await pren.remove()
        res.redirect('/storico')
    } catch {
        if(pren == null){
            res.send('prenotazione vuota')
        } else{
            res.send('Prenotazione non eliminata')
        }
    }
})

module.exports = router
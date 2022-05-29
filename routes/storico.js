const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const Prenotazione = require('../models/prenotazione')
const jwt = require('./jwt')

router.get('/', async (req, res) => {
    
    let token = req.cookies.token
    let userMail = jwt.getPayload(token).email
    try{
        const prenot = await Prenotazione.find({utente: userMail})
        res.render('storico', { 
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
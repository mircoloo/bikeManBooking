const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const prenotazione = require('../models/prenotazione')
/*
    per ora lo storico si occupa solo di fare una get di tutte
    le prenotazioni associate ad un utente di id=x
*/

// metodo temporaneo solo per fare prove di aggiunta di prenotazione
router.get('/new', (req, res) => {
    res.render('storico/new', { prenotazione : new prenotazione()})
})

router.post('/', (req, res) => {
    res.send(req.body.name)
})

//



router.get('/', (req, res) => {
    //res.render('storico/index');
    res.send('Pagina storico senza indice utente (vuota)')
})

router.get('/1', (req, res) =>{
    res.send('Pagina storico delle prenotazioni dell utente 1')
})
module.exports = router
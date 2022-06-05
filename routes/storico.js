const express = require('express')
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
        //console.log(prenot)
    } catch {
        res.send('error ')
    }
})

router.post('/:id', async (req, res) => {
    let id = req.params.id
    try{  
        let pren = await Prenotazione.findOne({_id: id}) 
        await pren.remove()
        res.redirect('/storico')
    } catch(err){
        res.render("errors", {error: err})
    }
})

module.exports = router
const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const Prenotazione = require('../models/prenotazione')


router.get('/', async(req, res) => {
    let so = {}
    if(req.query.data != null && req.query.data !== ''){
        so.data = String(new RegExp(req.query.data))
    } else {
        let tmp = new Date()
        if(tmp.getMonth() < 10){
            so.data = String(new Date().getFullYear()+'-0'+(new Date().getMonth()+1)+'-'+new Date().getDate())
            //console.log('minore di 10: ' + so.data)
        } else {
            so.data = String(new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate())
            //console.log('maggiore di 10: ' + so.data)
        }
    }
    try{
        so.data = so.data.endsWith('/') ? so.data.slice(0, -1) : so.data
        so.data = so.data.startsWith('/') ? so.data.slice(1, ) : so.data
        const prenotazioni = await Prenotazione.find(so) 

        //console.log(so.data)
        
        res.render('calendarioU/index', { 
            prenotazione : prenotazioni, 
            searchOptions: so,
            nuovaPren: new Prenotazione()
        })
    } catch {
        res.send('error ')
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
        res.render('calendarioU/created' , { prenotazione : newPrenotazione})
    } catch {
        res.render('calendarioU/error')
    }
})

module.exports = router
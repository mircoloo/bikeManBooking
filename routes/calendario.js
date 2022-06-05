const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const Prenotazione = require('../models/prenotazione')
const User = require('../models/user')
const jwt = require('./jwt')

// Pagina che permette di selezionare la data
router.get('/', async (req, res) => {
    const token = req.cookies.token
    const email = jwt.getPayload(token).email
    const user =  await User.findOne({email: email})
    //console.log(user, email) 
    if(user.client == false){ //calendario meccanico
        res.render('calendarioM')
    }else{ //calendario Utente
        let so = {}
        if(req.query.data != null && req.query.data !== ''){
            so.data = String(new RegExp(req.query.data))
        } else {
            so.data = new Date().toISOString().slice(0,10)
        }
        try{
            so.data = so.data.endsWith('/') ? so.data.slice(0, -1) : so.data
            so.data = so.data.startsWith('/') ? so.data.slice(1, ) : so.data
            const prenotazioni = await Prenotazione.find({data: so.data, utente: email}) 
    
            //console.log(so.data)
            res.render('calendarioU', { 
                prenotazione : prenotazioni, 
                searchOptions: so,
                nuovaPren: new Prenotazione()
            })
        } catch {
            res.render('errors', {error: "Errore caricamento pagina"})
        }
        //res.render('calendarioU');
    }
    
})

router.post('/', async (req, res) => {
    
    const token = req.cookies.token
    const email = jwt.getPayload(token).email
    const pren = new Prenotazione({
        data: req.body.data,
        utente: email,
        problema: req.body.problema,
        bici: req.body.bici
    })

    try{
        const newPrenotazione = await pren.save()
        res.render('created' , { prenotazione : newPrenotazione})
    } catch {
        res.render('errors', {error: "Errore creazione"})
    }
})

async function getPrenotazioni(data, type) {
    let sO = {}
    switch (type) {
        case "day":
            sO.data = data;
            break;
        case "week":
            var obj = new Date(data)
            var start = obj.getTime() - (obj.getDay() * 86400000)
            var end = start + 7 * 86400000
            sO.data = {
                $gte: new Date(start).toISOString().slice(0, 10),
                $lt: new Date(end).toISOString().slice(0, 10)
            }
            break;
        case "month":
            var obj = new Date(data)
            var start = obj.setDate(1)
            var end = obj.setMonth(obj.getMonth() + 1)
            sO.data = {
                $gte: new Date(start).toISOString().slice(0, 10),
                $lt: new Date(end).toISOString().slice(0, 10)
            }
            break;
    }

    // filtra sulla data
    return await Prenotazione.find(sO)
}

router.get('/prenotazioni', async (req, res) => {
    
    const token = req.cookies.token
    const email = jwt.getPayload(token).email
    let sO = {}
    let d = ""
    let prenotazioni
    if (req.query.data != null && req.query.data !== '') {
        d = String(req.query.data)
    } else {
        d = new Date().toISOString().slice(0, 10)
    }
    if (req.query.type != null && req.query.type !== '') {
        prenotazioni = await getPrenotazioni(d, req.query.type)
    } else {
        prenotazioni = await getPrenotazioni(d, "day")
    }
    res.json({
        prenotazione: prenotazioni,
        data: d
    })
})

module.exports = router
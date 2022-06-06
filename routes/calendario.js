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
    const user = await User.findOne({ email: email })

    try {
        if (user.client == false) {
            //calendario meccanico
            res.render('calendarioM')
        } else {
            //calendario Utente
            res.render('calendarioU')
        }
    } catch {
        res.render('errors', { error: "Errore caricamento pagina" })
    }

})

router.post('/', async (req, res) => {

    const token = req.cookies.token
    const email = jwt.getPayload(token).email

    try {
        const pren = new Prenotazione({
            data: req.body.data,
            utente: email,
            problema: req.body.problema,
            bici: req.body.bici
        })
        const newPrenotazione = await pren.save()
        res.render('created', { prenotazione: newPrenotazione })
    } catch {
        res.status(400).render('errors', { error: "Errore creazione" })
    }
})

async function getPrenotazioni(data, type, email) {
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
    if (email) {
        sO.utente = email
    }
    return await Prenotazione.find(sO)
}

router.get('/prenotazioni', async (req, res) => {

    const token = req.cookies.token
    const email = jwt.getPayload(token).email

    let sO = {}
    let d = ""
    let prenotazioni
    d = req.query.data || new Date().toISOString().slice(0, 10)

    const user = await User.findOne({ email: email })
    if (user.client == false) {
        if (req.query.type != null && req.query.type !== '') {
            prenotazioni = await getPrenotazioni(d, req.query.type)
        } else {
            prenotazioni = await getPrenotazioni(d, "day")
        }
        res.json({
            prenotazione: prenotazioni,
        })
    } else {
        prenotazioni = await getPrenotazioni(d, "day", user.email)
        res.json({
            prenotazione: prenotazioni,
            utente: email
        })
    }
})

module.exports = {
    router,
    getPrenotazioni,
}
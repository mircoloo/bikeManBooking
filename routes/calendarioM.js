const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const Prenotazione = require('../models/prenotazione')


// Pagina che permette di selezionare la data
router.get('/', async (req, res) => {
    try {
        res.render('calendarioM/index')
    } catch {
        res.send('error ')
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

    res.send({
        prenotazione: prenotazioni,
        data: d
    })
})

module.exports = router
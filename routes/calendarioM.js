const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const Prenotazione = require('../models/prenotazione')

// adesso la ricerca per data funziona correttamente, bisogna pulire il codice

// <input type="date" name="data" value="<%= prenotazione.data %>"></input> 
// 
// Pagina che permette di selezionare la data
router.get('/', async (req, res) => {
    let sO = {}
    let d = "";
    if (req.query.data != null && req.query.data !== '') {
        d = String(req.query.data)
    } else {
        d = new Date().toISOString().slice(0, 10)
    }
    switch (req.query.type) {
        case "day":
            sO.data = d;
            break;
        case "week":
            var obj = new Date(d)
            var start = obj.getTime() - (obj.getDay() * 86400000)
            var end = start + 7 * 86400000
            sO.data = {
                $gte: new Date(start).toISOString().slice(0, 10),
                $lt: new Date(end).toISOString().slice(0, 10)
            }
            break;
        case "month":
            var obj = new Date(d)
            var start = obj.setDate(1)
            var end = obj.setMonth(obj.getMonth() + 1)
            sO.data = {
                $gte: new Date(start).toISOString().slice(0, 10),
                $lt: new Date(end).toISOString().slice(0, 10)
            }
            break;
        default:
            sO.data = d;
            break;
    }
    
    
    try {
        const prenotazioni = await Prenotazione.find(sO) // filtra sulla data

        res.render('calendarioM/index', { 
            prenotazione : prenotazioni, 
            data: d
        })
    } catch {
        res.send('error ')
    }
})

module.exports = router
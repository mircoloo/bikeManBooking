const express = require('express')
const router = express.Router()


router.get('/' ,(req, res) => {
    res.render('login')
})

router.get('/logout', (req, res) => {
    res.cookie('token', '', {expires: 0}).render('login')
});

module.exports = router
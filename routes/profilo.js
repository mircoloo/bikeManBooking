const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router()
const User = require('../models/user')
const jwt = require('./jwt')



router.get('/',async (req, res) => {
    try{
        //console.log(req.cookies.token)
        let token = req.cookies.token
        let userMail = jwt.getPayload(token).email
        const user = await User.findOne({email: userMail})
        if(user){
            if(user.client){
                res.render('userProfile', {user: user});
            }else{
                res.render('mecProfile', {user: user});
            }
            //console.log(user)
            //jwt.checkToken(user.token)
            
        }else{
            res.status(401).render('login',{error: "Errore nell'autenticazione"})
        }
    }catch(err){
        res.status(401).render('login', {error: "Autenticazione scaduta"})
        console.log(err.message)
    }

   
})


module.exports = router
const express = require('express')
const router = express.Router()
const User = require('../models/user')
var bcrypt = require('bcrypt');
const {tokenGenFun} = require('./tokenGen')

router.post('/', async (req, res) => {
    let user;
    let email = req.body.email
    let password = req.body.password
    switch(req.body.submit){
        case 'Accedi':
            user = await User.findOne({email: email})
            if(user && user.password && bcrypt.compare(password, user.password)){
                //console.log(tokenGenFun(user), password, user.password)
                if(user.client == true){
                    res.render("userProfile", {user: user});
                }else if(user.client == false){
                    res.render("mecProfile", {user: user});
                }else{
                    res.render('errors', {error: "Si è verificato un errore nel login"})
                  }
            }else{
                res.render('login', {error: "Credenziali non valide"})
            }
            break;
        case 'Registrati':
            user = await User.findOne({email: email})
            if(!user){
                const salt = await bcrypt.genSalt(10);
                // now we set user password to hashed password
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                const user = new User({
                    email: req.body.email,
                    password: hashedPassword,
                    name: "",
                    surname: "",
                    bikes: [],
                    ebikes: [],
                    indirizzo: "",
                    client: true
                })
                const newUser = await user.save();
                res.render("userProfile", {user: newUser});
            }else{
                var messageError = "Email già presente"
                res.render('login', {error: messageError})
            }
            
            break;
    }   

})






module.exports = router



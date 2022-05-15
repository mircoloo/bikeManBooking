const express = require('express')
const router = express.Router()
const User = require('../models/user')
var bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    let user;
    let email = req.body.email
    let password = req.body.password
    switch(req.body.submit){
        case 'Accedi':
            user = await User.findOne({email: email})
            console.log(user.client)
            if(user && user.password == password){
                if(user.client == true){
                    res.render("userProfile", {user: user});
                }else if(user.client == false){
                    res.render("mecProfile", {user: user});
                    //res.json({ciao: "2"})
                    //res.send("Pagina meccanico")
                }
            }else{
                //res.redirect("/?valid=false");
                var messageError = "Credenziali non valide"
                res.render('login', {error: messageError})
            }
            break;
        case 'Registrati':
            user = await User.findOne({email: email})
            if(!user){
                const user = new User({
                    email: req.body.email,
                    password: req.body.password,
                    name: "",
                    surname: "",
                    bikes: [],
                    ebikes: [],
                    indirizzo: String,
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



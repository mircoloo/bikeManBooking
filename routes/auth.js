const express = require('express')
const router = express.Router()
const User = require('../models/user')
var bcrypt = require('bcrypt');
const jwt = require('./jwt')
const bodyParser = require('body-parser')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


router.post('/', async (req, res) => {
    //console.log(req.body)
    let user;
    let email = req.body.email
    let password = req.body.password
    switch(req.body.submit){
        case 'Accedi':              //CASO IN CUI L'UTENTE VUOLE ACCEDERE 
            user = await User.findOne({email: email})
            if(user && user.password && await bcrypt.compare(password, user.password)){
                //console.log(    user, password, user.password, await bcrypt.compare(password, user.password))
                let token = jwt.setToken(user.email);
                let payload = jwt.getPayload(token);
                if(user.client == true){
                    //res.render("userProfile", {user: user});
                    res.cookie('token', token).redirect(200, "/profilo")
                }else if(user.client == false){
                    //res.render("mecProfile", {user: user});
                    res.cookie('token', token).redirect(200, "/profilo")
                }else{
                    res.status(401).render('login', {error: "Credenziali non valide"})
                    //res.render('errors', {error: "Si è verificato un errore nel login"})
                  }
            }else{
                res.status(401).render('login', {error: "Credenziali non valide"})
            }
            break;
        case 'Registrati':      //CASO IN CUI L'UTENTE VUOLE REGISTRARSI
            user = await User.findOne({email: email})
            if(!user){
                password = req.body.password;
                if(password.length >= 6){
                    const salt = await bcrypt.genSalt(10);
                // now we set user password to hashed password
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                let token = jwt.setToken(req.body.email);
                let payload = jwt.getPayload(token);
                //jwt.checkToken(token)
                //user.token = token; user.save();
                const user = new User({
                    email: req.body.email,
                    password: hashedPassword,
                    name: "",
                    surname: "",
                    bikes: [],
                    ebikes: [],
                    indirizzo: "",
                    client: true,
                    token: token
                })
                const newUser = await user.save();
                //res.render("userProfile", {user: newUser});
                res.cookie('token', token).redirect("/profilo")
                }else{
                    res.status(400).render('login', {error: "Password troppo corta"})
                }
                
            }else{
                res.status(400).render('login', {error: "Email già presente"})
            }
            break;
    }   

})






module.exports = router



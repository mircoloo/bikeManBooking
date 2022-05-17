const express = require('express');
const { update } = require('../models/user');
const router = express.Router()
const User = require('../models/user')
const jwt = require("jsonwebtoken");


//getting all users
router.get('/getAll', async (req, res) => {
    
    try{
        //const users = await User.find().select('-password')
        const users = await User.find() 
        res.json(users)
    } catch (err){
        res.status(500).json({ message : err.message})
    }
});
//getting one user
router.get('/:email', getUser,async (req, res) => {
    res.json(res.user)
});

//creating one user

router.post('/', async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    try{
        const newUser = await user.save()
        res.status(201).json(newUser) 
    }catch(err){
        res.status(400).json({message :err.message})
    }
});

//updating one user
router.patch('/:email', getUser, async (req, res) => {
    console.log(req.params)
    if(req.body.email != null){
        res.user.email = req.body.email
    }
    if(req.body.password != null){
        res.user.password = req.body.password
    }
    if(req.body.nome != null){
        res.user.nome = req.body.nome
    }
    if(req.body.cognome != null){
        res.user.cognome = req.body.cognome
    }
    if(req.body.telefono != null){
        res.user.telefono = req.body.telefono
    }
    if(req.body.indirizzo != null){
        res.user.indirizzo = req.body.indirizzo
    }
    if(req.body.bikes != null){
        res.user.bikes.push(req.body.bikes)
    }
    if(req.body.ebikes != null){
        res.user.ebikes.push(req.body.ebikes)
    }

    try{
        const updateUser = await res.user.save()
        res.json(updateUser)
    }catch(err){
        res.status(400).json({message: error.message})
    }
});

//deleting one user

router.delete('/:email', getUser,async (req, res) => {
    try{
        await res.user.remove()
        res.json({message: "user deleted"})
    }catch(err){
        res.status(500).json({ message: err.message})
    }
});


//================ Middleware ======================
async function getUser(req, res, next){
    let user;
    try{
        user = await User.findOne({email:req.params.email})
        console.log(user)
        if(user == null){
            return res.status(404).json({message: 'cannot find the user'})
        }
    }catch (err){
        return res.status(500).json({message: err.message})
    }
    res.user = user
    next()
}

module.exports = router
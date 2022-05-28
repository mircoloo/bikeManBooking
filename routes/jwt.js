const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let options = { expiresIn: "1h" };


let getPayload = (token) => {
  var decode = jwt.decode(token, {complete: true});
  return decode.payload;
}

let setToken = (email) => {
  let payload = {email: email};

  let token = jwt.sign(payload, process.env.SUPER_SECRET, options);
  return token; 
}

let checkToken = (token) =>{
  return jwt.verify(token, process.env.SUPER_SECRET, options);
}

function userAuth(req, res, next){
  const token = req.cookies.token || req.body.cookie;
  if(!token){
      return res.status(401).render('login', {error: "Autenticazione non valida"})
  }
  try{
    checkToken(token);
  }catch{
    return res.status(401).render('login', {error: "Token non valido o scaduto"})
  }
  next();
}

module.exports = {
        setToken,
        getPayload,
        checkToken,
        userAuth
};

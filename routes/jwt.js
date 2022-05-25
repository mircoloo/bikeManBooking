const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  //console.log(token);
  if (!token) {
    res.status(401).json({ success: false, message: "No token provided." });
  }
  // decode token, verifies secret and checks expiration
  jwt.verify(token, process.env.SUPER_SECRET, async(err, user) => {
    if (err) {
      //res.status(403).render("login", { success: false, message: "Token not valid" });
      res.status(403).json({success:false,message:'Token not valid'})
    } else {
      // if everything is good, save in req object for use in other routes
      req.user = user;
      next();
    }
  });
}
/* 
function checkToken(user, token){
    var result;
    jwt.verify(token, process.env.SUPER_SECRET, (err, user) => {
      if(err) {
        result = false;
      } else {
        result = true;
      } 
    });
    return result;
  } */

  function generateToken(user){
    let payload = {
        email: user.email,
      };
        let options = { expiresIn: 3600 }; // expires in 1 hours
        let token = jwt.sign(payload, process.env.SUPER_SECRET, options);
        return token;
}

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
  jwt.verify(token, process.env.SUPER_SECRET, options);
}

module.exports = {
        setToken,
        getPayload,
        checkToken
};

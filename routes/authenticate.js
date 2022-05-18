const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/", async function (req, res) {
    let user;
  try {
    switch (req.body.submit) {
      case "Accedi":
        user = await User.findOne({ email: req.body.email }).exec();
        console.log(user);
        if (!user) {
          res.render("login", { error: "Credenziali non valide" });
          //res.json({ success: false, message: "User not found" });
        }
        if (user.password != req.body.password) {
          res.render('login', {error: "Password sbagliata"});
        }
        // Building JWT
        var payload = {
          email: user.email,
          id: user._id,
        };
        var options = { expiresIn: 3600 }; // expires in 1 hours
        var token = jwt.sign(payload, process.env.SUPER_SECRET, options);

        jsonres = {
          success: true,
          message: "Enjoy your token!",
          token: token,
          email: user.email,
          id: user._id,
          self: "api/v1/users/" + user.email,
        };
        user.token = token;
        user.save();
        if(user.client == true){
            res.render("userProfile", { user: user, res: jsonres });
        }else{
            res.render("mecProfile", { user: user, res: jsonres });
        }
        
        break;

      case "Registrati":
        user = await User.findOne({ email: req.body.email });
        
        // Building JWT
        var payload = {
          email: user.email,
          password: user.password,
          id: user._id,
        };
        var options = { expiresIn: 3600 }; // expires in 1 hours
          var token = jwt.sign(payload, process.env.SUPER_SECRET, options);
          const newUser = await user.save();
        if (!user) {
          const user = new User({
            email: req.body.email,
            password: req.body.password,
            name: "",
            surname: "",
            bikes: [],
            ebikes: [],
            indirizzo: "",
            client: true,
            token: token
          });

          
          
          res.render("userProfile", { user: newUser, token: token });
          
          

        } else {
          var messageError = "Email già presente";
          res.render("login", { error: messageError });
        }
        break;
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

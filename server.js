const express = require('express')
const path = require('path')
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config()
require('./scripts/dbConnection')
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts') 


const port = process.env.PORT || 3000
const app = express()

//MIDDLEWARES
app.use('/public', express.static("public"));
app.use("/styles",  express.static(__dirname + '/public/stylesheets'));
app.use("/scripts", express.static(__dirname + '/public/javascripts'));
app.use("/images",  express.static(__dirname + '/public/images'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//SETS
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static(path.join(__dirname, "/public")))
app.use(cookieParser());

//ROUTER
const usersRouter = require('./routes/users');



//ROUTES
//app.use('/api/v1/users', tokenChecker);
app.use('/api/v1/users', usersRouter);


app.use( (req, res) =>{
    res.status(404).render('errors', {error: "Pagina non trovata"});
} )
app.listen(port, () => {
    console.log(`Server is istening on port ${port}`)
});


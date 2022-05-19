const express = require('express')
const path = require('path')
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config()
require('./scripts/dbConnection')
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


//ROUTER
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const authenticationRouter = require('./routes/authenticate')
const {authenticateToken} = require('./routes/tokenChecker')


//ROUTES
app.use('/', indexRouter)

//app.use('/api/v1/users', tokenChecker);
app.use('/api/v1/users', usersRouter);


app.use('/api/v1/authenticate', authRouter)




app.listen(port, () => {
    console.log(`Server is istening on port ${port}`)
});


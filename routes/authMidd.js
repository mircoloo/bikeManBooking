const jwt = require('./jwt')


const checkAuth = (req, res, next) => {
    if(req.headers['authorization'] == null){
        res.sendStatus(401)
    }else{
        let token = req.headers['authorization'];
        console.log("Token client" + token);
        next();
    }
}

module.exports = {
    checkAuth
}
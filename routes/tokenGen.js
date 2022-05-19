const jwt = require('jsonwebtoken')


function tokenGenFun(user){
    let payload = {
        email: user.email,
        password: user.password,
        id: user._id,
      };
        let options = { expiresIn: 3600 }; // expires in 1 hours
        let token = jwt.sign(payload, process.env.SUPER_SECRET, options);
        return token;
}

module.exports = {tokenGenFun}
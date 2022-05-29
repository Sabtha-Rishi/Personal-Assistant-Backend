const jwt = require('jsonwebtoken');
const User = require('../model/accounts.model');


const isLoggedin = (req, res, next) => {
    try{
        if (!req.cookies.token){
            return res.send('login required');
        }

        const user_id = (jwt.verify(req.cookies.token, process.env.JWT_SECRET)).id
        User.findOne({ __id : user_id }, function(err, user) { 
            next()

            if(err) {
                return res.send(err.message);
            }
        })
        
    } catch {
        res.status(401).json({
          error: ('Invalid request!')
        });
    }
}

const AccountsMiddleware = {
    isLoggedin,
}

module.exports = AccountsMiddleware;

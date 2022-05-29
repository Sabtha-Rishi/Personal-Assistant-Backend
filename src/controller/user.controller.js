const User = require('../model/accounts.model');
const AccountsController = require('./accounts.controller')
const jwt = require('jsonwebtoken'); 



// User data from TOKEN
const getUser = (req, res) => {

    if (!req.cookies){
        return res.send('login required')
    }

    const user_id = (jwt.verify(req.cookies.token, process.env.JWT_SECRET)).id
    User.findOne({ _id : user_id }, function(err, user) { 
        return res.status(200).send(user); 
    })
}


const UserController = {
    getUser,
};


module.exports = UserController;
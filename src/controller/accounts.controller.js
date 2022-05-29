const User = require('../model/accounts.model'); 
const jwt = require('jsonwebtoken');

//  Creating new user
const createUser = async (req, res) => { 

        let newUser = new User(); 
    
        newUser.email = req.body.email,
        newUser.setPassword(req.body.password); 
        
        newUser.save((err, User) => { 
            if (err) { 
                return res.status(400).send({
                    "error" : err.message
                });
            } 
            else { 
                User.save(newUser);
                return res.send("Registration Successful"); 
            } 
        }); 
        
    }; 



// User Login and Token Generator
const loginUser =  (req, res) => { 

    // Find user with requested email 
    User.findOne({ email : req.body.email }, function(err, user) { 
        if (user === null) { 
            return res.status(400).send({ 
                error : "User not found."
            }); 
        } 
        else { 
            if (user.validPassword(req.body.password)) { 

                const token = jwt.sign({
                    id : user._id,
                }, process.env.JWT_SECRET);

                res.cookie("token", token, { expire: new Date() + 9999 });
                return res.status(201).send({ 
                    token : token
                }) 
            } 
            else { 
                return res.status(400).send({ 
                    message : "Wrong Password"
                }); 
            } 
        } 
    }); 
}

// User Logout
const logoutUser = (req, res) => {
    res.clearCookie("token")
    res.send("Logged out")
}


const AccountsController = {
    createUser,
    loginUser,
    logoutUser,
}

module.exports = AccountsController;
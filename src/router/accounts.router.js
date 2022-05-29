// Importing modules 
const express = require('express'); 
const AccountsController = require('../controller/accounts.controller')



const AccountsRouter = express.Router();



// Auth Routes
AccountsRouter.post('/register', AccountsController.createUser); 
AccountsRouter.post('/login', AccountsController.loginUser); 
AccountsRouter.post('/logout', AccountsController.logoutUser);
// AccountsRouter.post('/login', AccountsController.loginUser); 









module.exports = AccountsRouter;


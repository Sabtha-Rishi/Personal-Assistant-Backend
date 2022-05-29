// Importing modules 
const express = require('express'); 
const UserController = require('../controller/user.controller')



const UserRouter = express.Router();



// Auth Routes
UserRouter.get('/', UserController.getUser); 








module.exports = UserRouter;


// __________________________________________ IMPORTS START _____________________________________

//  Built-in Modules
const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express'); 
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config();

//  Router Imports
const AccountsRouter = require('./router/accounts.router');
const UserRouter = require('./router/user.router');
const NotesRouter = require('./router/notes.router');


// Middleware Imports
const AccountsMiddleware = require('./middleware/accounts.middleware');

// __________________________________________ IMPORTS END _____________________________________
// __________________________________________ DEFAULTS START __________________________________

//  Express App
const app = express();

//  Body Parser
app.use(express.json());
app.use(cookieParser());


//  Connect to MongoDB
mongoose.connect(process.env.DBURL, { useNewUrlParser:true, useUnifiedTopology:true})
    .then((result) => console.log('Connected to DB'))
    .catch((err) => console.log(err));
    

// __________________________________________ DEFAULTS END __________________________________
// __________________________________________ ROUTES START __________________________________

app.use('/accounts', AccountsRouter)
app.use('/user', UserRouter)
app.use('/notes', AccountsMiddleware.isLoggedin ,NotesRouter)





// __________________________________________ ROUTES END __________________________________
// __________________________________________ SERVER RUNNING _____________________________

https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
}, app).listen(8000, ()=>{
    console.log(`Listening on PORT ${8000} ....`)
})
'use strict';
const Express = require("express");
const Port = process.env.PORT || 1337;
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");
const App = Express();
const cors = require('cors');
const Config = require("./config/index");


// Connect to Mongoose database
Mongoose.connect(Config.mongoUrl, {useNewUrlParser : true})
.then((success)=>{
    console.log('Db connected successfully')
})
.catch(e=>{
    console.log('Problem while connecting to DB')
})


// Middlewares
App.use(cors());
App.use(BodyParser.urlencoded ({
    extended: false
}));
App.use(BodyParser.json());



// Use Api routes in the App
require('./routes')(App)

 
//Starts the server
App.listen(Port, (req, res) => {
    console.log(`server running on port ${Port}`);
});


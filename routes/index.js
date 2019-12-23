'use strict';

const User = require('./user')

module.exports = (app) => {  
    app.use(User)
    
};
//configuration for the enviroments using npm config files are alocated on config folder
const config = require('config');

//debug nodejs module
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
// to set the debug type we use 
// export DEBUG=app:startup
// export DEBUG=app:startup,app:db
// export DEBUG=app:*
// DEBUG=app:db nodemon index.js

// third party middleware
const helmet = require('helmet');
var morgan = require('morgan');
// input validation module class
const Joi = require('joi');
// load the express framework module
const express = require('express');
// call the express function which return an object
const app = express();
app.use(express.json()); // enable json req.body
app.use(express.urlencoded({extended: true})); //key=value&key=value

// use to access and share static files
app.use(express.static('public'));
app.use(helmet());



// use morgan just when you are working on development
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled ......')
}

// Db Work for database
dbDebugger('Connected to the database....');

//local middleware
const logger = require('./middleware/logger');


// build custom middleware
app.use(logger);


app.use(function(req, res, next){
    console.log('Authenticating.....');
    next();
});
     




//================================  Router ================================
// call the courses module from the router
const courses = require('./routes/courses');
const home = require('./routes/home');
app.use('/api/courses', courses);
app.use('/', home);


//================================  CONFIGURATION ================================
//export NODE_ENV=development
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail server: ${config.get('mail.host')}`);
// export app_password=1234
console.log(`Mail password from environment varibales: ${config.get('mail.password')}`);

// Environment variable
const port = process.env.PORT || 3000;

//listen on a given port
app.listen(port, () => console.log(`Listening on port ${port}...`));

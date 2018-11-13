// load the express framework module
const express = require('express');
// call the express function which return an object
const app = express();
app.use(express.json()); // enable json req.body
//Mongo Db
const mongoose = require('mongoose')
// genre APIS
const genres = require('./routes/genre');
app.use('/api/genres', genres); 

const customers = require('./routes/customer');
app.use('/api/customers', customers); 


//Connect to MongoDb
mongoose.connect('mongodb://localhost/nodejs_db')
.then( () => console.log('Connected to MongoDB....'))
.catch(err => console.error('Could not connect  to MongoDB..' , err));

// Environment variable
const port = process.env.PORT || 3000;

//listen on a given port
app.listen(port, () => console.log(`Listening on port ${port}...`));

// To run the application
// 1. nodemon
// 2. node index.js
const express = require('express');
//middleware for working with errore
const error = require('../middleware/error');
// genre APIS
const genres = require('../routes/genre');
const customers = require('../routes/customer');
const movies = require('../routes/movies-api');
const rentals = require('../routes/rentas-api');
const users = require('../auth/routes/users');//Users
const auth = require('../auth/routes/login'); //Login

module.exports  = function(app){

app.use(express.json()); // enable json req.body
app.use('/api/genres', genres); 
app.use('/api/customers', customers); 
app.use('/api/movies', movies); 
app.use('/api/rentals', rentals); 
app.use('/api/users', users); 
app.use('/api/auth', auth); 
// to handle the errors
app.use(error);
}
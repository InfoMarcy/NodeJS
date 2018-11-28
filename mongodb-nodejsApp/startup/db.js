//Mongo Db
const mongoose = require('mongoose');
//working with log files
const winston = require('winston');

module.exports = function (){
//Connect to MongoDb
mongoose.connect('mongodb://localhost/nodejs_db')
.then( () => winston.info('Connected to MongoDB....'))
.catch(err => winston.error('Could not connect  to MongoDB..' , err));
}
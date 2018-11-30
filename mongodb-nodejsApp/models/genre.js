const mongoose = require('mongoose');
const Joi = require('joi');


//schema
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
  });


//Models class
const Genre = mongoose.model('Genre', genreSchema);

// validate Genre
function validateGenre(genre){
    // if invalid 400  - Bad Request // joi input validation
   const schema = {
       name: Joi.string().min(5).max(50).required()
   };
   return Joi.validate(genre, schema);
};


exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;
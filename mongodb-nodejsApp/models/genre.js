const mongoose = require('mongoose');
const Joi = require('joi');
//Models class
const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

// validate Genre
function validateGenre(genre){
    // if invalid 400  - Bad Request // joi input validation
   const schema = {
       name: Joi.string().min(3).required()
   };
   return Joi.validate(genre, schema);
};


exports.Genre = Genre;
exports.validate = validateGenre;
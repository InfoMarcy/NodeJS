const mongoose = require('mongoose');
const Joi = require('joi');
const genreSchema = require('./genre');

//Models class
const Movies = mongoose.model('Movies', new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
        maxlength: 50
    },

    genre: {
        type: genreSchema,
        required: true 
      },

    numberInStock: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 255
    }
}));
// validate movies
function validateMovies(movie){
    // if invalid 400  - Bad Request // joi input validation
   const schema = {
       title: Joi.string().min(3).max(50).required(),
       genreId: Joi.objectId().required(),
       numberInStock: Joi.number().min(0).required(),
       dailyRentalRate: Joi.number().min(0).required()
   };
   return Joi.validate(movie, schema);
};

exports.Movies = Movies;
exports.validate = validateMovies;



/* {
	"title" : "Batman",
	"genreId": "5beb0f64e256d1210dba2f24",
	"numberInStock" : 3,
	"dailyRentalRate" : 2
}
5bec66c65af9ed21995e9504
*/
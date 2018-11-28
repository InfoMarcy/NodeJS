const mongoose = require('mongoose');
const Joi = require('joi');

//Models class
const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 14

    }
}));

// validate Customer
function validateCustomer(customer){
    // if invalid 400  - Bad Request // joi input validation
   const schema = {
       name: Joi.string().min(3).required(),
       // phone is required
        // and must be a string of the format XXX-XXX-XXXX
        // where X is a digit (0-9)
       phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
       isGold: Joi.boolean()
   };
   return Joi.validate(customer, schema);
};

exports.Customer = Customer;
exports.validate = validateCustomer;
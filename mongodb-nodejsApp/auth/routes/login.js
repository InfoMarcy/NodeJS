const express = require('express');
const router = express.Router();
// used for working with objects
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const {User} = require('../model/user');




// create a record in the database
router.post('/', async (req, res) => {
      // validate the body of the request
      const { error } = validate(req.body);
      if (error) return res.status(400).send(error.details[0].message)


      // find user by email
      let user = await User.findOne({ email: req.body.email });
      

      // validate if the email exist
      if(!user) return res.status(400).send('Invalid email or password');

      // validate the password 
     const validPassword =  await  bcrypt.compare(req.body.password, user.password);

        // validate if the email exist
        if(!validPassword) return res.status(400).send('Invalid email or password');


        //json web token with config
         //json web token with config
     const token  = user.generateAuthToken();
      //  const token  = jwt.sign({ _id: user._id}, config.get('jwtPrivateKey')); 
        res.send(token);
});


function validate(req) {
    const schema = {
      email: Joi.string().min(3).max(50).required().email(),
      password: Joi.string().min(3).max(1024).required()
    };
  
    return Joi.validate(req, schema);
  }


module.exports = router;
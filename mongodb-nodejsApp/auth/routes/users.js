const express = require('express');
const router = express.Router();
const {User, validate} = require('../model/user');
const auth = require('/Users/desarrolladorios1/Documents/Node_Sandbox/mongodb-nodejsApp/middleware/auth');


// used for working with objects
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');


// get the information of the client
router.get('/me', auth, async (req, res) => {
 const user =  await User.findById(req.user._id).select('-password');
res.send(user);
});


// create a record in the database
router.post('/', async (req, res) => {
      // validate the body of the request
      const { error } = validate(req.body);
      if (error) return res.status(400).send(error.details[0].message)


      // find user by email
      let user = await User.findOne({ email: req.body.email });
      

      // check if the user exist
      if(user) return res.status(400).send('User already registered.');

      // create the user
   user = new User(_.pick(req.body, ['name', 'email', 'password']));

   // hash password
   const salt=  await bcrypt.genSalt(16);
   user.password =  await bcrypt.hash(user.password, salt);
   //save the user
   await user.save();


     //json web token with config
     const token  = user.generateAuthToken();
  // return the new user
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;

// Information Expert Principle
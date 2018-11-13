const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../models/customer');

// route to get all the customer from the database
router.get('/', async (req, res)=> {
    const customer = await Customer.find().sort('name');
    res.send(customer);
})

// create a record in the database
router.post('/', async (req, res) => {
    // validate the body of the request
    const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)

    // set the genre values
    let customer = new Customer({ name: req.body.name, phone: req.body.phone, isGold: req.body.isGold });
    // save to database
    customer = await customer.save();

    // send back the responds
    res.send(customer);
});

// update a record in the database
router.put('/:id', async (req, res) => {

        // validate the body of the request
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message)
   
        //update and retreave the genre
     const customer= await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold ? req.body.isGold : false }, {new: true})

     // if there is no record return 404 error
    if(!customer) return res.status(404).send('The customer with the given ID was not found');
    // return the response
    res.send(customer);
});

// delete a record from the database
router.delete('/:id', async (req, res) => {
    //delete and retreave the genre
    const customer = await Customer.findByIdAndRemove(req.params.id);

    // if there is no record return 404 error
    if (!customer) return res.status(404).send('The customer with the given ID was not found');
    // return the response
    res.send(customer);
});


// Get an item By ID from the database
router.get('/:id', async (req, res) => {
    //delete and retreave the genre
    const customer = await Customer.findById(req.params.id);

    // if there is no record return 404 error
    if (!customer) return res.status(404).send('The customer with the given ID was not found');
    // return the response
    res.send(customer);
});

module.exports = router;
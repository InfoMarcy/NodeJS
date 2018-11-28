const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Fawn = require('fawn');
const {Rental, validate} = require('../models/rental');
const {Movies} = require('../models/movies-model');
const {Customer} = require('../models/customer');

//load Mongoose on fwan
Fawn.init(mongoose);

// route to get all the rentals from the database
router.get('/', async (req, res)=> {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
})

// create a record in the database
router.post('/', async (req, res) => {
    // validate the body of the request
    const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)




  // check that the customer is a valid customer
  const customer = await Customer.findById(req.body.customerId);
if(!customer ) return res.status(400).send('Invalid Customer');
console.log("customer", customer);


  // check that the movies is a valid movie
  const movie = await Movies.findById(req.body.movieId);
  if(!movie) return res.status(400).send('Invalid Movie');


  console.log("movie", movie);

  
  if(movie.numberInStock === 0) return res.status(400).send('Movie not in stock.')

    // set the genre values
    let rental = new Rental({ 
        customer: {
          _id: customer._id,
          name: customer.name, 
          phone: customer.phone
        },
        movie: {
          _id: movie._id,
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate
        }
      });


     console.log("before Try");
     // save a transaction .save('rentals', rentals); => name of the collection 'rentals'
     try{
            new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id}, { 
                $inc: { numberInStock: -1 }
            }).run();
     }  catch(ex){
         res.status(500).send('Something failed');
     }
 
 
    // save to database
   // rentals = await rentals.save();


    //update number in stcok of the movie
   // movie.numberInStock--;
   // movie.save();

    // send back the responds
    res.send(rental);
});



// Get an item By ID from the database
router.get('/:id', async (req, res) => {
    //delete and retreave the genre
    const rentals = await Rentals.findById(req.params.id);

    // if there is no record return 404 error
    if (!rentals) return res.status(404).send('The rentals with the given ID was not found');
    // return the response
    res.send(rentals);
});

module.exports = router;
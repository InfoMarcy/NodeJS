const express = require('express');
const router = express.Router();
const {Movies, validate} = require('../models/movies-model');
const {Genre } = require('../models/genre');

// route to get all the movies from the database
router.get('/', async (req, res)=> {
    const movies = await Movies.find().sort('title');
    res.send(movies);
})

// create a record in the database
router.post('/', async (req, res) => {
    // validate the body of the request
    const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)


  // get the genre by ID
  const genre = await Genre.findById(req.body.genreId);
  if(!genre) return res.status(400).send('Invalid genre');

    // set the genre values
    const movies = new Movies({ 
        title: req.body.title, 
        numberInStock: req.body.numberInStock, 
        dailyRentalRate: req.body.dailyRentalRate, 
        genre: {
            _id: genre._id,
            name: genre.name
        }
    });

    // save to database
     await movies.save();

    // send back the responds
    res.send(movies);
});

// update a record in the database
router.put('/:id', async (req, res) => {

        // validate the body of the request
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

          // get the genre by ID
          const genre = await Genre.findById(req.body.genreId);
          if (!genre) return res.status(400).send('Invalid genre.');
        
          const movie = await Movies.findByIdAndUpdate(req.params.id,
            { 
              title: req.body.title,
              genre: {
                _id: genre._id,
                name: genre.name
              },
              numberInStock: req.body.numberInStock,
              dailyRentalRate: req.body.dailyRentalRate
            }, { new: true });
        
          if (!movie) return res.status(404).send('The movie with the given ID was not found.');
          
          res.send(movie);
});

// delete a record from the database
router.delete('/:id', async (req, res) => {
    //delete and retreave the genre
    const movies = await Movies.findByIdAndRemove(req.params.id);

    // if there is no record return 404 error
    if (!movies) return res.status(404).send('The movies with the given ID was not found');
    // return the response
    res.send(movies);
});

// Get an item By ID from the database
router.get('/:id', async (req, res) => {
    //delete and retreave the genre
    const movies = await Movies.findById(req.params.id);

    // if there is no record return 404 error
    if (!movies) return res.status(404).send('The movies with the given ID was not found');
    // return the response
    res.send(movies);
});

module.exports = router;
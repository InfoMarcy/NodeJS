const express = require("express");
const router = express.Router();
const { Genre, validate } = require("../models/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// route to get all the Genres from the database
router.get("/", async (req, res, next) => {
  //throw new Error('Could not get the genres. yeah');
    const genres = await Genre.find().sort("name");
    res.send(genres);
});

// create a record in the database
router.post("/", auth, async (req, res) => {
  // validate the body of the request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
    // set the genre values
    let genre = new Genre({ name: req.body.name });
    // save to database
    genre = await genre.save();
    // send back the responds
    res.send(genre);
});

// update a record in the database
router.put("/:id", async (req, res) => {
  // validate the body of the request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
    //update and retreave the genre
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );

    // if there is no record return 404 error
    if (!genre)
      return res.status(404).send("The Genre with the given ID was not found");
    // return the response
    res.send(genre);
});
// delete a record from the database
router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    //delete and retreave the genre
    const genre = await Genre.findByIdAndRemove(req.params.id);

    // if there is no record return 404 error
    if (!genre)
      return res.status(404).send("The Genre with the given ID was not found");
    // return the response
    res.send(genre);
  } catch (ex) {
    res.status(500).send("Something went wrong");
  }
});

// Get an item By ID from the database
router.get("/:id", async (req, res) => {
  //delete and retreave the genre
  const genre = await Genre.findById(req.params.id);

  // if there is no record return 404 error
  if (!genre)
    return res.status(404).send("The Genre with the given ID was not found");
  // return the response
  res.send(genre);
});

module.exports = router;

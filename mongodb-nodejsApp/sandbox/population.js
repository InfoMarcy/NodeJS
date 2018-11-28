const mongoose = require('mongoose');
// Connect to MongoDb
mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


  // create a collection called author
const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));


  // create a collection called Course
const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
}));



// function which create an author
async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}


// function which create an course
async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    .populate('author', 'name -_id')
    .populate('category', 'name')
    .select('name author');
  console.log(courses);
}

createAuthor('Mosh', 'My bio', 'My Website');

// createCourse('Node Course', 'authorId')

// listCourses();
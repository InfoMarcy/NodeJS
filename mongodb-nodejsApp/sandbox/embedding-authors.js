const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: {
  type: [authorSchema],
  required: true 
}

}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

//createCourse('Node Course', [  new Author({ name: 'Mosh' }), new Author({ name: 'Juan' })] );




async function addAuthor(courseId, author) { 
  const course = await Course.findById(courseId);
  course.authors.push(author);

  course.save();

  console.log(courses);
}

//addAuthor('5beb4a967218ba46759e12c6', new Author({ name: 'Marci Garcia' }));



async function removeAuthor(courseId, authorId) { 
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();

  console.log(courses);
}

removeAuthor('5beb4a967218ba46759e12c6', '5beb4b71d29f7b472a65e075');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodejs_db')
 .then( () => console.log('Connected to mongoDB....'))
 .catch(err => console.error('Could not connect  to MongoDB..' , err));




 const courseSchema = new mongoose.Schema({
     name: String,
     author: String,
     tags: [String],
     date: {type: Date, default: Date.now},
     isPublished: Boolean,
     price: Number
 });

     //Models class
     const Course = mongoose.model('mongo-exercises', courseSchema);

     async function removeCourse(id){
      const result =  await  Course.findByIdAndRemove({ _id: id});
      console.log(result);
     }



     removeCourse('5a68fe2142ae6a6482c4c9cb');

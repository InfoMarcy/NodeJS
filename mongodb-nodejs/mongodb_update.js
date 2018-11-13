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

     async function updateCourse(id){
         const course = await Course.findByIdAndUpdate({ _id: id }, {
            $set: {
                author: 'Marcy',
                isPublished:  false
            }
         }, {new: true});
        console.log(course);
     }

     updateCourse('5a68fde3f09ad7646ddec17e');


     //mongodb update operators
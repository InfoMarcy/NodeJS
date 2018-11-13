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


     async function getCourses(){
       return  await Course
        .find({ isPublished: true, tags: { $in: ['backend', 'fontend'] }})
        .or([{ price: { $gte : 15} }, { name : /.*by.*/i } ])
        .sort('-price')
        .select('name author price');
     }

    async function run() {
        const courses = await getCourses();
        console.log(courses);
    }

    run();
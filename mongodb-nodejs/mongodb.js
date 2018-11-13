const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodejs_db')
 .then( () => console.log('Connected to mongoDB....'))
 .catch(err => console.error('Could not connect  to MongoDB..' , err));

 const courseSchema = new mongoose.Schema({
     name: String,
     author: String,
     tags: [String],
     date: {type: Date, default: Date.now},
     isPublished: Boolean
 })


 
    //Models class
    const Course = mongoose.model('course', courseSchema);


    // function to insert data in mongoDb
    async function createCourse(){
    //Object of the class Course
    const course = new Course({
        name: 'Angular Course',
        author: 'Marcy',
        tags: ['Angular', 'frontend'],
        isPublished: true
    });

        const result = await course.save();
        console.log(result);
    }


   // createCourse();


   // function to retreave data from MongoDB
   async function getCourses(){

    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)


    // OR
    // And

    // find all documents
    //const courses = await Course.find();


    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10


    // find by parameters
     const courses = await Course

    

    // .find({author: 'Marcy', isPublished: true })
   //    .find({ price: { $gt: 10, $lte: 20 }})
   //.find({price: { $in: [10, 15, 20]}})
   //.find().or([{author: 'Marcy'}, {isPublished: true}])
   //.and([{author: 'Marcy'}, {isPublished: true}])

   //Starts with something
   .find({author: /^Marcy/})

   // Ends with
  // .find({author: /Garcia$/i})

   //Contains
  // .find({author: /.*Marcy.*/i})

// pagination
.skip((pageNumber -1)* pageSize)
     .limit(pageSize)
     .sort({name: 1})
   //  .select({ name: 1, tags: 1}); 
      .count()
     console.log(courses);
   }


 // import data from a file to the database
 //  mongoimport --db mongo-exercises --collection courses --drop --file exercise-data.json --jsonArray

   getCourses(); 
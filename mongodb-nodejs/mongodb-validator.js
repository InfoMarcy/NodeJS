const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodejs_db')
 .then( () => console.log('Connected to mongoDB....'))
 .catch(err => console.error('Could not connect  to MongoDB..' , err));

 const courseSchema = new mongoose.Schema({
     name: {
         type: String, 
         required: true, 
         minlength: 5,
        maxlength: 50,
        //match: /patern/
    },

    category: {
        type: String,
        required: true,
        enum: ['Web', 'Mobile', 'Network']
    },
     author: String,
     tags: {
         type: Array,
         validate: {
             validator: function(v){
                 return v && v.length > 0;
             },
             message: 'A Course should have a least one tag.' 
         }

     },
     date: {type: Date, default: Date.now},
     isPublished: Boolean,
     // if isPublished is true then the price would be required
     price: {
         type: Number,
           required: function() { return this.isPublished},
        min: 10,
        max:200
    }
 })


    //Models class
    const Course = mongoose.model('course', courseSchema);


    // function to insert data in mongoDb
    async function createCourse(){
    //Object of the class Course
    const course = new Course({
        name: 'Angular Course',
        category: 'Web',
        author: 'Marcy',
        tags: null,
        isPublished: true,
        price: 250

    });


    try{
        const result = await course.save();
        console.log(result);
       
    }catch(ex){
        console.log(ex.message);
    }
      
    }


    createCourse();
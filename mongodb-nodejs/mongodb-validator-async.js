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
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
       // uppercase: true,
        trim: true
    },
     author: String,
     tags: {
         type: Array,
         validate: {
             isAsync: true,
             validator: function(v, callback){

                setTimeout(() => {
                     // Do some async work
                    const result =  v && v.length > 0;
                    callback(result);
                }, 1000);
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
        max:200,
        get: v => Math.round(v), 
        set:  v => Math.round(v)
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
        tags: ['fontend'],
        isPublished: true,
        price: 23.7

    });


    try{
        const result = await course.save();
        console.log(result);
       
    }catch(ex){
        for(field in ex.errors)
        console.log(ex.errors[field].message);
    }
      
    }


    createCourse();
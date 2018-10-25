// load the express framework module
const express = require('express');
const router = express.Router();

// array of courses
const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'},
    {id: 4, name: 'course 4'},
    ]

    // http get without parameters
    router.get('/', (req, res) => {
    res.send(courses);
    });
    
    // http get with parameters
    router.get('/:id', (req, res) => {
       let course = courses.find(c => c.id === parseInt(req.params.id));
    
       if(!course){ // 404 not found
         return  res.status(404).send('The course with the given id was not found');
       }
    
        // if course exist return it
        res.send(course);
        });
    
    //================================ http POST request ================================
    
    router.post('/', (req, res)=> {
    
    //validate
    const { error } = validateCourse(req.body); // result.error
    
       if(error){ // 400 Bad Request
        res.status(400).send(error.details[0].message);
        return;
      };
    
        const course = {
            id: courses.length +1,
            name: req.body.name
    };
    
    //save the course
    courses.push(course);
    // return the course
    res.send(course);
    });
    
    
    //================================ http PUT request ================================
    router.put('/:id', (req, res)=> {
    // Look for the course  and  if not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
       if(!course){ // 404 not found
         return  res.status(404).send('The course with the given id was not found');
       }
    
    //validate
    const { error } = validateCourse(req.body); // result.error
    
       if(error){ // 400 Bad Request
        res.status(400).send(error.details[0].message);
        return;
      };
    
    // update the course
    course.name = req.body.name;
    // Return the updated course
    res.send(course);
    
    });
    
    //================================ http DELETE request ================================
    router.delete('/:id', (req, res)=> {
    // Look for the course  and  if not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
       if(!course){ // 404 not found
          return res.status(404).send('The course with the given id was not found');
       }
    
    // delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    
    // return the same course
    res.send(course);
    
    });
    
    //================================ joi input validation fucntion  ================================
// validate course
function validateCourse(course){
    // if invalid 400  - Bad Request // joi input validation
        const schema = {
            name: Joi.string().min(3).required()
        };
        
       return Joi.validate(course, schema);
}

module.exports = router;
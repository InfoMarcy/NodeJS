// load the express framework module
const express = require('express');
const router = express.Router();




//================================  http GET request ================================
router.get('/', (req, res) => {
    res.send('Hello World!');
    });

//================================  Query ================================
      // http get with  multiples parameters => http://localhost:5000/api/post/2018/1
      router.get('/api/post/:year/:month', (req, res) => {
        return res.send(req.params);
       });
     
     
             // http get with  multiples parameters => http://localhost:5000/api/post/2018/1?sortBy=name
     //app.get('/api/post/:year/:month', (req, res) => {
     //   res.send(req.query);
     //   });
    
     module.exports = router;
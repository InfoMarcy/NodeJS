
const path = require('path');
const os = require('os');
const fs = require('fs');



const EventEmitter = require('events');

//var pathObj = path.parse(__filename)
//console.log(pathObj);

//var memory = os.totalmem();
//var user = os.userInfo().gid;

//console.log("User info " + user);
//console.log(`Total Memory: " ${memory}`);

//const files = fs.readdirSync('./');
//console.log(files);

// Is recomended to always use asyncronous methods
//fs.readdir('./', function(err, files) {
 //   if (err) console.log('Error', err);
 //   else console.log('Result', files)
//});

// class
//const emitter = new EventEmitter();



//const EventEmitter = require('events');
//const Logger = require('./logger');
//const logger = new Logger();


// Register  a listener
//logger.on('MessageLog', (arg) => {
//  console.log('Listener called', arg);
//});


//logger.log('message');


const http = require('http');
const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.write('Hello World!');
        res.end();    
    }

    if(req.url === '/api/courses'){
        res.write(JSON.stringify([1, 2, 3, 4]));
        res.end();
    }
});

server.on('connection', (socket) => {
    console.log('new connection...');
})
server.listen(3000);
console.log('Listening on port 3000...')
const EventEmitter = require('events');

class Logger extends EventEmitter {
     log(message){
        console.log(message);

    // Raise an event
    this.emit('MessageLog', {id: 1 , url: 'http://apideusuario-microprofile.a3c1.starter-us-west-1.openshiftapps.com/employees/username/usuario_strong'});
    }
}

module.exports = Logger;
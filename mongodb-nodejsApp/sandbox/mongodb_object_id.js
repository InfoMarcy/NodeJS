// MongoDb Id 12 bytes
// _id: 5bed940d40a61eb302211cc3
// 4 first bytes: timestamp
// 3 next bytes : machine identifier
// 2 bytes:processs identifier
// 3 bytes: counter


//1 byte = 8 bits
//2 ^ 8 = 256 
//2 ^ 24 = 16M

const mongoose = require('mongoose');
const id = new mongoose.Types.ObjectId();


// get the time in which the id was created
console.log(id.getTimestamp());


const isValid = mongoose.Types.ObjectId.isValid('1234');
console.log(isValid);
const bcrypt = require('bcrypt');

// get a salt for the passowrd
async function run(){
    const salt=  await bcrypt.genSalt(16);
    const hashed=  await bcrypt.hash('1234', salt);
    console.log(salt);
    console.log(hashed);
}
run();
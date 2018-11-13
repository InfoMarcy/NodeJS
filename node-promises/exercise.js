function getCustomer(id){

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            console.log('Getting a Customer ...');
            resolve({id: id, name: 'Marcy', isGold: true, email: 'marcygarcia@outlook.com'});
        }, 4000);

    })
}



function getTopMovies(){

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            console.log('Getting Top Movies ...');
            resolve(['Movie1', 'Movie 2', 'Movie 3']);
        }, 4000);

    })
}


function sendEmail(email, movies){
 return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('sending the email ...');
            resolve();
        }, 4000);

    })
}


async function notifyCustomer(){
    const customer = await getCustomer(12);
    console.log('Customer: ', customer);
    if(customer.isGold){
        const movies  = await getTopMovies();
        console.log('Top Movies: ', movies);
       await sendEmail(customer.email, movies)
       console.log('Email sent.....');
    }
}

notifyCustomer();
// resolving a promise
const p = Promise.resolve({id: 1});
p.then(result => console.log(result));


// rejecting a promise
const r = Promise.reject(new Error('reason for rejection...'));
r.catch(error => console.log(error));



const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation 1...');
        resolve(1);
       // reject(new Error('Because something failed...'));
    }, 2000);
});



const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2...');
        resolve(2);
    }, 2000);
});


// calling diferent promises at the same time
Promise.all([p1, p2])
 .then(result => console.log(result))
 .catch(err => console.log('Error', err.message));

 // as soon as one promise in this array is fullfil it will execute 
 Promise.race([p1, p2])
 .then(result => console.log(result))
 .catch(err => console.log('Error', err.message));
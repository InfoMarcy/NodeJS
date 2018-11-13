function getUser(id){
    return new Promise((resolve, reject) => {
    //Kick off some async work 
    setTimeout(() => {
        console.log('Reading a user from a database');
        resolve({id: id, gitHubUsername: 'infomarcy'})
    }, 2000);
    })
}

function getRepositories(username){
    return new Promise((resolve, reject) => {
        //Kick off some async work 
        setTimeout(() => {
            console.log('Calling Github API repos...');
            resolve(['repo1', 'repo2' , 'repo3']);
        }, 2000);
        })
}


function getCommits(repo){
    return new Promise((resolve, reject) => {
        //Kick off some async work 
        setTimeout(() => {
            console.log('Calling Github API commits...');
            resolve(['commit']);
        }, 2000);
        })
}

// call a promise
//const p = getUser(1);
//p.then(user => console.log(user));

// another way to call a promise
getUser(1)
 .then(user => getRepositories(user.gitHubUsername))
 .then(repos => getCommits(repos[0]))
 .then(commits => console.log('commits', commits))
 .catch(err => console.log('Error', err.message));
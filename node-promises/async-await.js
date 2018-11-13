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
           // resolve(['repo1', 'repo2' , 'repo3']);
            reject(new Error('Could not get the repos....'));
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



//Async and await
async function displayCommits(){

    try{
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits)
    } catch(err){
        console.log('Error', err.message);

    }

};

displayCommits();
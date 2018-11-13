console.log('Before');


//Callbacks => is a function tha we are going to call when the result of an async operation is ready
//============= Asynchronous callbacks
getUser(1, getRepositories);

function getRepositories(user){
// get the list of repos
getRepositories(user.gitHubUsername,getCommits);
}
 
function getCommits(repos){
    getCommits(repo, displayCommits);
}

function displayCommits(commits){
    console.log(commits);
}

console.log('After');



// Promises => is an object that holds the eventual results of an async operation 

//Async/await => 



function getUser(id, callback){
    setTimeout(() => {
        console.log('Reading an user from a database');
        callback({id: id, gitHubUsername: 'infomarcy'})
        //return {id: id, gitHubUsername: 'infomarcy'};
    }, 2000);
}

// get the list of repository of a username from github
function getRepositories(username, callback){
    setTimeout(() => {
        console.log('Calling Github API...');
        callback(['repo1', 'repo2', 'repo3']);
}, 2000);
};
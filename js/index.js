//STEP 1: The index.html file has a form with a search input. 
//When the form is submitted, it should take the value of the input 
//and search GitHub for user matches using the User Search Endpoint.

//https://api.github.com/search/users?q=${username}

document.addEventListener("DOMContentLoaded", () => {

    //GLOBAL VARIABLES
    const searchForm = document.querySelector("#github-form");
    const userList = document.querySelector("#user-list");
    const repoList = document.querySelector('#repos-list')

    //ADD EVENT LISTENER
    searchForm.addEventListener("submit", (eventObj)=> {
        eventObj.preventDefault();

        const username = eventObj.target.search.value;

        searchForm.reset();

        fetch(`https://api.github.com/search/users?q=${username}`)
        .then (response => response.json())
        .then (singleUserData => {

            const liUsername = document.createElement("li");
            liUsername.textContent =  singleUserData.items[0].login;

            const userImage = document.createElement("img");
            userImage.src = singleUserData.items[0].avatar_url;

            const p = document.createElement("p");
            p.innerHTML = `<a href="${singleUserData.items[0].html_url}">GitHub Link </a>`;

            userList.append(liUsername, userImage, p);
            
            liUsername.addEventListener('click', ()=> {
            // console.log('I was clicked')
            reposSingleUserData(username)
        })
        })

    function reposSingleUserData(username){
        fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repoData =>{

            repoData.forEach((repo) => {
                // console.log(repo.name)
                const liRepoName = document.createElement("li")
                liRepoName.textContent = repo.name
                repoList.append(liRepoName)
            })
         })
        }

    })

    //Using the results of the search, display information about the \
    //users to the page. (You might include showing their username, avatar 
    //and a link to their profile.)


    // function username (name){
    //     name.forEach(renderUsername);
    // }


















})


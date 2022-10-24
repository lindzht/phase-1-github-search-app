//STEP 1: The index.html file has a form with a search input. 
//When the form is submitted, it should take the value of the input 
//and search GitHub for user matches using the User Search Endpoint.

//https://api.github.com/search/users?q=${username}

document.addEventListener("DOMContentLoaded", () => {

    //GLOBAL VARIABLES
    const searchForm = document.querySelector("#github-form");
    const userList = document.querySelector("#user-list");
    const repoList = document.querySelector('#repos-list')

    // KL MOVED TO HAVE SECTION UPDATE
    const liUsername = document.createElement("li");
    const userImage = document.createElement("img");
    const p = document.createElement("p");
    userList.append(liUsername, userImage, p);

    //ADD EVENT LISTENER
    searchForm.addEventListener("submit", (eventObj)=> {
        eventObj.preventDefault();

        const username = eventObj.target.search.value;

        searchForm.reset();

        fetch(`https://api.github.com/search/users?q=${username}`)
        .then (response => response.json())
        .then (singleUserData => {

            liUsername.textContent =  singleUserData.items[0].login;
            userImage.src = singleUserData.items[0].avatar_url;
            p.innerHTML = `<a href="${singleUserData.items[0].html_url}">GitHub Link </a>`;
            
            reposSingleUserData(username)
        }) // second then ends
    

    function reposSingleUserData (username) {
        fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repoData => 
            repoData.forEach((repo) => {
                const aRepoName = document.createElement("a")
                aRepoName.textContent = repo.name
                aRepoName.href = repo.url
                repoList.append(aRepoName)
        }) // for each ends
        ) //second then ends
    } //function ends

    }) //form event listener ends

    //Using the results of the search, display information about the \
    //users to the page. (You might include showing their username, avatar 
    //and a link to their profile.)


    // function username (name){
    //     name.forEach(renderUsername);
    // }

})  // dom content loaded ends


var URL = "https://jsonplaceholder.typicode.com/users/1";


fetch(URL)
.then(response => response.json() )
.then(data => console.log(data))
.catch(err => console.log(err))
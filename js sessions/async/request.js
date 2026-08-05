var URL = "https://jsonplaceholder.typicode.com/users/1";
var request = new XMLHttpRequest();

request.addEventListener("readystatechange", () => {
  if (request.status === 200 && request.readyState)
    console.log(request.responseText, request.readyState);

  if (request.status !== 200 && request.readyState);
  console.log("Failed to fetch");
});

request.open("GET", URL);

request.send();

// 0 = unsent
// 1 = open function has been called
// 2 = send function has been called
// 3 = partial data downloading
// 4 = completed

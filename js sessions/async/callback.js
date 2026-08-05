var URL = "https://jsonplaceholder.typicode.com/users/1";

function sendRequest(url, cb) {
  var request = new XMLHttpRequest();

  request.addEventListener("readystatechange", () => {
    if (request.status === 200 && request.readyState)
      cb(null, JSON.parse(request.responseText));

    if (request.status !== 200 && request.readyState);
    cb("Failed to fetch", null);
  });

  request.open("GET", URL);

  request.send();
}

sendRequest(URL, (err, data) => {
  console.log("error =>", err, "data =>", data);
  if (err) console.log(err);
  else console.log(data);
});

// 0 = unsent
// 1 = open function has been called
// 2 = send function has been called
// 3 = partial data downloading
// 4 = completed

// selectors

// console.log(document.getElementById("main-heading"));
// console.log(document.getElementsByClassName("para"));
// console.log(document.getElementsByTagName("button"));

// console.log(document.querySelector("#main-heading"));
// console.log(document.querySelector(".para"));
// console.log(document.querySelector("p"));

// innertext/textcontent and innerHTML

var head = document.querySelector("#main-heading");

// console.log(head.textContent);
// console.log(head.innerHTML);

// head.textContent = "bye <i>world</i>";
// head.innerHTML = "bye <i>world</i>";

// console.log(head.style);

// head.style.border = "1px solid red";
// head.style = "border:1px solid red";

// console.log(head.attributes);
// console.log(head.getAttribute("id"));

// head.setAttribute("class", "hello");

// console.log(head.attributes);

// console.log(head.classList);
// head.classList.add("hello");
// console.log(head.classList);
// head.classList.remove("hello");

// console.log(head.classList);

head.addEventListener("click", () => {
  head.textContent = "bye world";
});

document.querySelectorAll(".submit").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    head.textContent = e.target.textContent;
  });
});

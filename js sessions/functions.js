// functions are reusable block of code
// where the code inside of a function runs  only when the function is called by its name
// followd by pair of ()

// function declaration

function addition(a, b) {
  console.log(a + b);
}

addition(23, 34);
addition("John", "doe");

var sum = addition(12, 34);
console.log(sum);

// return : primary purpose of using a return keyword is to terminate the function
// and secondrely return a value out of the function

function calBmi(weight, height) {
  return weight / height ** 2;
}

var res = calBmi(100, 1.8);
console.log(res);
//  function expressions
//  ---- arrow and anonymous

// anonymous

// var calcAge = function (yob) {
//   return new Date().getFullYear() - yob;
// };

// arrow

// var calcAge = (yob) => {
//   return new Date().getFullYear() - yob;
// };

// when a function is passed into another function as a argument the passed function is considered a callback function

function calcAge(yob) {
  return;
}

function lifeSpan(average_age, ageFn, yob) {
  return average_age - ageFn(yob);
}

// var years_remaining = lifeSpan(100, calcAge, 1999);

var years_remaining = lifeSpan(
  100,
  //   function (yob) {
  //     return new Date().getFullYear() - yob;
  //   }, // anonymous
  (yob) => new Date().getFullYear() - yob, // arrow
  1999
);

console.log(years_remaining);

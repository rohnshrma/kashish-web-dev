// sequence of characters(alphabets, numbers, special symbols and whitespace) enclosed in
// single, double quotes or backticks

// how to check the data type of a value / variable : typeof keyword

// var x = 124;
// console.log(typeof 123);
// console.log(typeof x);

// note :  value collect using prompt function is of type 'String by default',
// but can be converted into supported data type

// var x = parseFloat(prompt("Enter name : "));
// console.log(typeof x, x);

// console.log(2 + 2); // 4
// console.log(2 + "2"); // 22
// console.log(2 + +"2"); // 4
// console.log(2 + -"2"); // 0

// concatentation : adding two or more string together using the + operator

// var fname = prompt("Enter first name : ");
// var lname = prompt("Enter last name : ");
// var age = Number(prompt("Enter age : "));

// console.log(
//   "Hello world my name is " +
//     fname +
//     " " +
//     lname +
//     " and i am " +
//     age +
//     " years old."
// );

// template literal / string literal
// string is created using ` ` and values are injected in ${}

// console.log(
//   `Hello world my name is ${fname} ${lname} and i am ${age} years old.`
// );

// indexing

// h e l l o

// 1 2 3 4 5 : normal counting (starting from 1)
// 0 1 2 3 4 : positive indexing (starting from 0) (L->R)
//-5-4-3-2-1 : negative counting (starting from -1) (R->L)

// [ ] are used to get the character using indexing

console.log("hello"[0]);
console.log("hello"[-1]);

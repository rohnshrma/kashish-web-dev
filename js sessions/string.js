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

// console.log("hello"[0]);
// console.log("hello"[-1]);

var txt = "hello world this is john doe";

// console.log(txt[0]);
// console.log(txt[txt.length - 1]);

// string methods

// return character on the specified index(positive only)
console.log(txt.charAt(12));
console.log(txt.charAt(-5));

// return character on the specified index(both positive and negative)
console.log(txt.at(12));
console.log(txt.at(-5));

console.log(txt.includes("x"));
console.log(txt.includes("o"));
console.log(txt.includes("o", 8)); //substring , start position (inclusive)

console.log(txt.slice());
console.log(txt.slice(6)); // start position (inclusive)
console.log(txt.slice(6, 8)); // start position (inclusive) , stop (exlusive)

// return the index of the first occurance of the substring specified, if not found returns -1
console.log(txt.indexOf("o"));
console.log(txt.indexOf("o", 5)); // substring , start position (inclusive)
console.log(txt.indexOf("z")); // substring , start position (inclusive)

// return the index of the last occurance of the substring specified, if not found returns -1
console.log(txt.lastIndexOf("o", 7)); // substring  , start (from right to left) (inclusive)

console.log(txt.split()); // whole string as a single  item in array
console.log(txt.split("")); // each character as a seperate item in array
console.log(txt.split(" ")); // each word as a seperate item in array
console.log(txt.split("o", 2));

console.log(txt.replace("o", "x"));
console.log(txt.replace(/o/g, "x"));

console.log(txt.replaceAll("o", "x"));

console.log(txt.repeat(3));

console.log(txt.endsWith("d", 11)); // substring , end position(exclusive)

console.log(txt.startsWith("d", 10)); // substring , start position(inclusive)

console.log(txt.concat(" and i am 8", " years old"));

console.log("         hello world        ".trim());
console.log("         hello world        ".trimStart());
console.log("         hello world        ".trimEnd());

console.log(txt.toUpperCase());
console.log(txt.toLowerCase());

console.log(txt.padEnd(30)); // new length (more than the actual length)
console.log(txt.padStart(30)); // new length (more than the actual length)

console.log(txt.padEnd(30, "*#")); // new length (more than the actual length)
console.log(txt.padStart(40, "#*")); // new length (more than the actual length)

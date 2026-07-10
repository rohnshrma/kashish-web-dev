// output

// console.log("hello world");

// window.alert("hello world");

//input :

// prompt("Enter your name : ", "john doe");

// variable

// empty container used to store data, having a label on them known as variable name or identifier

var age; // decalaration

age = 34; // initialization

var age = 45;

// variable naming conventions

// 1. no space
// 2.  a variable name cannot start with a number but can include or end with a number
// 3.  a variable name cannot start, include or end with a special symbol , except "_" and "$"
// 4. do not use reserved keywords as variable name, but can be used in a variable name

// 1. start variable name with a lowercase letter
// 2. in case of multiword variable name use "camelCasing" or "snake_casing"

var helloworldmynameis; // normal casing
var helloWorldMyNameIs; // camelCasing
var hello_world_my_name_is; // snake_casing

// ======== primitive
// number
// string  : ""  , '' , ``
// boolean : true | false
// null : intentional absence of value
// undefined : unintentional absence of value

// ======== reference
// array
// object
// functions

var x = 23;
var y = x; // y = 23 (copy of value of x)
console.log(x, y);

x = 100;

console.log(x, y);

var a = [1, 2, 3, 4, 4, 6];
var b = a;

console.log(a, b);

a[2] = 100;
console.log(a, b);

// arithmetic operators

var a = 23;
var b = 3;
console.log(a + b); // sum
console.log(a / b); // quotient
console.log(a - b); // difference
console.log(a % b); // remainder
console.log(a * b); // product
console.log(a ** b); // exponential

// assigment operator

var x = 23; // regular assignment
console.log(x);
x += 10; // add and assign assignment
console.log(x);
x -= 23; // subtract and assign assignment
console.log(x);
x /= 23; // quotient and assign assignment
console.log(x);
x %= 23; // remainder and assign assignment
console.log(x);
x *= 23; // product and assign assignment
console.log(x);
x **= 23; // exponential and assign assignment
console.log(x);

// comparison operators

console.log("22" == 22); // equals to (value)
console.log("22" === 22); // strict equals to (value and data type)
console.log("22" != 22); // not equals to (value)
console.log("22" !== 22); // strict not equals to (value and data type)

console.log(12 > 10); // greater than
console.log(12 >= 10); // greater than or equals to
console.log(12 <= 10); // lesser than or equals to
console.log(12 < 10); // lesser than

// logical operators
// && , || , !

console.log(a > b && b < a); // t && t = t
console.log(a < b && b < a); // f && t = f
console.log(a < b && b > a); // f && f = f

console.log(a > b || b < a); // t || t = t
console.log(a < b || b < a); // f || t = t
console.log(a < b || b > a); // f || f = f

console.log(!true);
console.log(!false);

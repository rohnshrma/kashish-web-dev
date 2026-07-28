// array: is used to store multiple values of smiliar of different data types
// [ ] are used to create to create an array where items are divided using ","

// arrays are of reference data types

var marks = [123, 23, 3, 3, 23, 2, 32, 3, 2];

// indexed, ordered, allows duplicates and is changable
console.log(marks.length);
console.log(marks); // ordered and allows duplicates
console.log(marks[0]); // indexed

marks[0] = 10000;

console.log(marks);

// array methods

// add new item/s to the arraay

marks.push(1234, 45556);
console.log(marks);

// remove last item from an array by default
marks.pop();
marks.pop();
console.log(marks);

// add  new item/s at the start of an array
marks.unshift(1000000, 122222);
console.log(marks);

// remove first item from an array
marks.shift();
console.log(marks);

marks.splice(5, 0, "hello", "bye bye");
console.log(marks);

marks.splice(0, 1, "hata dia");
console.log(marks);

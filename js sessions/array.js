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

var marks = [123, 23, 555, 3, 3, 23, 2, 32, 3, 2];

// var biggest = marks[0];

// for (var i = 0; i < marks.length; i++) {
//   var mark = marks[i];
//   if (mark > biggest) {
//     biggest = mark;
//   }
// }

// console.log(biggest);

// marks.forEach((v, i, arr) => {
//   console.log(v, i, arr);
// });

// var biggest = marks[0];

// marks.forEach((mark) => {
//   if (mark > biggest) {
//     biggest = mark;
//   }
// });

// console.log(biggest);

// var cubes = [];

// marks.forEach((mark) => {
//   cubes.push(mark ** 3);
// });
// console.log(cubes);

// var cubes = marks.map((mark) => mark ** 3);
// console.log(cubes);

// var res = marks.map((mark) => {
//   return { [mark]: mark % 2 === 0 ? "even" : "odd" };
// });

// console.log(res);

// var evens = [];

// marks.forEach((mark) => {
//   mark % 2 === 0 && evens.push(mark);
// });
// console.log(evens);

// var evens = marks.map((mark) => mark % 2 === 0);
// console.log(evens);

// var evens = marks.filter((mark) => mark % 2 === 0);
// console.log(evens);

// const emails = [
//   "john@gmail.com",
//   "alice@yahoo.com",
//   "rohan123@gmail.com",
//   "priya.sharma@outlook.com",
//   "amit@company.com",
//   "neha@gmail",
//   "rahul123gmail.com",
//   "sneha@@gmail.com",
//   "@gmail.com",
//   "vikas@.com",
//   "pooja@gmail.co",
//   "karan@gmail.come",
//   "riya@hotmail.com",
//   "sumit123@outlook.com",
//   "ankit@gmailcom",
//   "megha@company",
//   "deepak@yahoo.com",
//   "  aman@gmail.com",
//   "nisha@gmail..com",
//   "harsh@gmail.com ",
//   "simran#gmail.com",
//   "raj@company.org",
//   "tina@gmail.com",
//   "mohit@domain.net",
//   "sonam@gmail",
//   "gauravgmail.com",
//   "kiran@domain",
//   "manish@domain.c",
//   "seema@gmail.come",
//   "ravi@gmail@com",
//   "payal@yahoo.com",
//   "arjun@company.com",
//   "isha@outlook.com",
//   "dev@gmail..come",
//   "abhishek@gmail.com",
//   "rohit@gmail",
//   "sakshi@ gmail.com",
//   "rahul@companycom",
//   "monika@.gmail.com",
//   "vivek@gmail.com",
//   "puneet@gmail.co.in",
//   "yash@hotmail.com",
//   "nikhilgmailcom",
//   "komal@domain..com",
//   "aditya@gmail.come",
//   "shivani@outlookcom",
//   "ankita@gmail.com",
//   "tarun@company..com",
//   "kirti@company.com",
//   "user@domain.",
// ];

// const valids = [];

// emails.forEach((email) => {
//   if (
//     email.endsWith(".com") ||
//     email.endsWith(".gmail") ||
//     email.endsWith(".yahoo") ||
//     email.endsWith(".hotmail")
//   ) {
//     valids.push(email);
//   }
// });

// console.log(valids);

// const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// const validsemails = emails.filter((email) => regex.test(email.trim()));

// console.log(validsemails);

// case 1 : when value of pv is not explicitly defined
// acc / pv : arr[0]
// cv : arr[1]

// [123, 23, 3, 3, 23, 2, 32, 3, 2];

// var total = marks.reduce((acc, cv) => {
//   // acc = acc + cv
//   // console.log(acc, cv);
//   return acc + cv;
// });

// console.log(total);

// case 2 : when value of pv is explicitly defined
// acc / pv : value
// cv : arr[0]

// [123, 23, 3, 3, 23, 2, 32, 3, 2];

// var maxi = marks.reduce((max, cv) => {
//   console.log(max, cv);
//   return cv > max ? cv : max;
// }, marks[0]);

// console.log(maxi);

console.log( marks.sort((a,b)=>a-b))
console.log( marks.sort((a,b)=>b-a))

// array of objects: 20 students, each with age, name and marks

var students = [
  { name: "Aarav", age: 16, marks: 78 },
  { name: "Vivaan", age: 17, marks: 85 },
  { name: "Aditya", age: 16, marks: 62 },
  { name: "Vihaan", age: 15, marks: 91 },
  { name: "Arjun", age: 17, marks: 54 },
  { name: "Sai", age: 16, marks: 73 },
  { name: "Reyansh", age: 15, marks: 88 },
  { name: "Ayaan", age: 17, marks: 45 },
  { name: "Krishna", age: 16, marks: 95 },
  { name: "Ishaan", age: 15, marks: 67 },
  { name: "Priya", age: 16, marks: 82 },
  { name: "Ananya", age: 17, marks: 59 },
  { name: "Diya", age: 15, marks: 76 },
  { name: "Saanvi", age: 16, marks: 90 },
  { name: "Aadhya", age: 17, marks: 48 },
  { name: "Myra", age: 15, marks: 71 },
  { name: "Anika", age: 16, marks: 64 },
  { name: "Kiara", age: 17, marks: 87 },
  { name: "Riya", age: 16, marks: 55 },
  { name: "Ira", age: 15, marks: 99 },
];

console.log(students);
console.log(students.length);


var stu_names = students.map(stuObj => stuObj.name)




console.log(stu_names)


console.log(stu_names.sort((a,b)=> a.localeCompare(b)))
console.log(stu_names.sort((a,b)=> b.localeCompare(a)))


console.log(students.sort((a,b)=> a.marks - b.marks ))



console.log(students.some(student => student.age < 18))
console.log(students.some(student => student.age > 100))

console.log(students.every(student => student.age < 18))
console.log(students.every(student => student.age > 100))



// practical tasks: some()

// 1. check if any product is out of stock (stock === 0)
// 2. check if any product costs more than 10000
// 3. check if any product has a rating below 3
// 4. check if at least one product is both out of stock and has a rating above 4

// practical tasks: every()

// 5. check if every product has a rating of 3 or above
// 6. check if every product is in stock (stock > 0)
// 7. check if every product costs less than 15000
// 8. check if every product name contains more than 3 characters

// practical tasks: sort()

// 9. sort products by price, low to high
// 10. sort products by price, high to low
// 11. sort products by rating, best to worst
// 12. sort products alphabetically by name (A-Z)
// 13. sort products by stock, lowest to highest (find what's running out first)

// practical tasks: combining some() / every() / sort()

// 14. sort products by rating (desc), then log whether ANY of the top 3 are out of stock
// 15. sort products by price (asc), then check if EVERY product in the cheapest half is in stock
// 16. check if every in-stock product has a rating >= 4; if true, sort those products by price
// 17. sort products by stock ascending, then use some() to find if any of the bottom 3 (lowest stock) also have rating > 4.5
// 18. write a function isSellable(product) that returns true if stock > 0 and rating >= 4, then use every() to check if the entire products array is sellable, and if not, sort the array to bring non-sellable products to the top

<<<<<<< Updated upstream
=======
console.log(maxi);

let numbers = [5, 12, 8, 130, 44, 3, 21, 9, 17, 60];
let names = ["rohan", "amit", "priya", "neha", "sahil"];

var x = names.map((n, i) => `${n}-${numbers[i]}`);

console.log(x);
>>>>>>> Stashed changes

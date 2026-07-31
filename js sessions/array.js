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

var maxi = marks.reduce((max, cv) => {
  console.log(max, cv);
  return cv > max ? cv : max;
}, marks[0]);

console.log(maxi);

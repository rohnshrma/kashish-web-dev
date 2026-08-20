// ============================================================
// PRACTICE TASKS — TOPICS COVERED SO FAR
// ============================================================
// Covers: variables, if/else, loops, functions, arrays/objects,
// classes, and the Node.js fs module.
//
// Instructions:
// - Write your solution below each task, inside the space provided.
// - Don't just read the task — actually run it and check the output.
// - Some tasks build on the ones before them, so do them in order.
// ============================================================


// ------------------------------------------------------------
// SECTION 1: IF / ELSE
// ------------------------------------------------------------

// Task 1.1
// Write a function isEven(num) that logs "Even" if the number
// is even, and "Odd" otherwise.


// Task 1.2
// Write a function checkAge(age) that logs:
//   "Child"   if age < 13
//   "Teen"    if age is 13-19
//   "Adult"   if age >= 20
// Use if / else if / else.


// Task 1.3
// Using the ternary operator (condition ? a : b), write a function
// max2(a, b) that returns the larger of two numbers.


// ------------------------------------------------------------
// SECTION 2: LOOPS (for, while, do...while, break/continue)
// ------------------------------------------------------------

// Task 2.1
// Using a for loop, print all numbers from 1 to 50 that are
// divisible by 3.


// Task 2.2
// Write a function isPalindrome(str) that uses a for loop to check
// whether a string reads the same forwards and backwards.
// e.g. isPalindrome("racecar") -> true


// Task 2.3
// Using a while loop, reverse a number.
// e.g. 12345 -> 54321


// Task 2.4
// Print the multiplication table (1 to 10) for any number using a
// for loop, formatted like: "7 x 1 = 7"


// Task 2.5
// Using a for loop with break, find and log the first number in the
// array below that is greater than 100.
var numbers = [12, 45, 67, 23, 150, 89, 200];


// Task 2.6
// Using a for loop with continue, log only the odd numbers from 1 to 20
// (skip the even ones).


// ------------------------------------------------------------
// SECTION 3: FUNCTIONS (declarations, expressions, arrow, callbacks)
// ------------------------------------------------------------

// Task 3.1
// Write a function declaration add(a, b) that returns the sum of two
// numbers.


// Task 3.2
// Rewrite Task 3.1 as an arrow function expression called addArrow.


// Task 3.3
// Write a function calculateBMI(weight, height) that returns
// weight / height ** 2.


// Task 3.4
// Write a function applyOperation(a, b, operationFn) that takes two
// numbers and a callback function, and returns the result of calling
// operationFn(a, b).
// Then call applyOperation(5, 3, ...) once with an arrow function that
// adds the numbers, and once with one that multiplies them.


// ------------------------------------------------------------
// SECTION 4: ARRAYS & OBJECTS
// ------------------------------------------------------------

// Task 4.1
// Given the array below, use a loop (for or for...of) to calculate
// the sum of all elements.
var scores = [12, 45, 67, 23, 89];


// Task 4.2
// Create an object "student" with properties: name, age, and grades
// (an array of 3 numbers). Write a function that logs the student's
// name along with the average of their grades.


// ------------------------------------------------------------
// SECTION 5: CLASSES
// ------------------------------------------------------------

// Task 5.1
// Create a class Person with a constructor that takes name and age,
// and a method greet() that logs "Hi, I'm <name> and I'm <age> years old."
// Create two instances and call greet() on each.


// Task 5.2
// Create a class Counter with:
//   - a constructor that sets count = 0
//   - a method increment() that adds 1 to count
//   - a method decrement() that subtracts 1 from count
//   - a method getCount() that returns the current count
// Create an instance, call increment() 3 times and decrement() once,
// then log the final count.


// ------------------------------------------------------------
// SECTION 6: NODE.JS fs MODULE
// ------------------------------------------------------------
// const fs = require("fs");

// Task 6.1
// Using fs.writeFileSync, create a file "notes.txt" containing your
// name and today's date.


// Task 6.2
// Using fs.appendFileSync, add a second line to "notes.txt" that
// says "Practicing the fs module!".


// Task 6.3
// Using fs.readFileSync, read "notes.txt" and log its contents.


// Task 6.4 (challenge — combines classes + fs)
// Create a class Logger with:
//   - a constructor that takes a file path and stores it
//   - a method log(message) that appends the message (with a newline)
//     to the file using fs.appendFileSync
//   - a method readAll() that returns the full file contents using
//     fs.readFileSync
// Create an instance pointing at "log.txt", log a few messages, then
// print the full log using readAll().

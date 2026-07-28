// for, while , do while , for in , for of

// fixed iteration
// initialization
// condition
// update (increment / decrement)

// for (initialization ; condition ; update){
// code to be executed
// }

// for (var i = 1; i <= 100; i += 1) {
//   console.log(i);
// }

// 7 x 1 = 7
// 7 x 2 = 14
// // ...

// var num = 7;

// for (var i = 1; i <= 10; i += 1) {
//   console.log(`${num} x ${i} = ${num * i} `);
// }

// var reversed = "";
// var txt = "racecar";
// for (var i = txt.length - 1; i >= 0; i -= 1) {
//   reversed += txt[i];
// }

// if (reversed == txt) console.log("Palindrome");
// else console.log("Not Palindrome");

// var num = 12345;
// var reversed = 0;

// while (num > 0) {
//   var digit = num % 10;
//   reversed = reversed * 10 + digit;
//   num = Math.floor(num / 10);
// }

// console.log(reversed);

// while :fixed iteration

var arr = [12323, 232, 3, 23, 2, 3, 23, 2, 3233, 5, 4, 556, 76, 8, 79, 9, 90];

// for (var i = 0; i < arr.length; i++) {
//   console.log(arr[i]);
// }

// var i = 0;

// while (i < arr.length) {
//   console.log(arr[i]);
//   i += 1;

// }

// var i = 1;

// while (i <= 10) {
//   if (i == 5) break;

//   console.log(i);

//   i += 1;
// }

// var i = 1;

// while (i <= 10) {
//   if (i === 5) continue;

//   console.log(i);

//   i += 1;
// }

// var email = prompt("Enter email : ");

// while (email.length < 8 || !email.endsWith(".com" || !email.includes("@"))) {
//   email = prompt("Enter email : ");
// }

// console.log("Shi hai");

// var secret = Math.floor(Math.random() * 100) + 1;

// var attempts = 0;
// var max_attempts = 10;

// while (attempts < max_attempts) {
//   var guess = parseInt(prompt("Enter your guess : "));

//   if (guess < 1 || guess > 100) {
//     alert("Invalid Guess");
//     continue;
//   }

//   attempts += 1;

//   if (guess < secret) {
//     alert("Too Low! Try High");
//   } else if (guess > secret) {
//     alert("Too High! Try Low");
//   } else {
//     alert(`Congratulations! You've guessed the correct number ${secret}`);
//     break;
//   }
// }

// if (attempts >= max_attempts) {
//   alert(`Failed to guess! the correct number was ${secret}`);
// }

var words = ["bat", "cat", "rat"];

var word = words[Math.floor(Math.random() * words.length)];

var guessed = Array(word.length).fill("_");

const tried = [];

var attempts = 6;

while (attempts > 0 && guessed.includes("_")) {
  alert(
    `Word : ${guessed.join(
      " "
    )}\nAttempts Remaining : ${attempts}\nCharaters Tried : ${tried.join(", ")}`
  );

  var guess = prompt("Enter your guess : ").toLowerCase();

  if (guess.length > 1 || guess.length < 1 || !/^[a-z]$/.test(guess)) {
    alert("Guess must be a single character");
    continue;
  }

  if (tried.includes(guess)) {
    alert("Character already tried");
    continue;
  }

  tried.push(guess);

  if (word.includes(guess)) {
    for (var i = 0; i < word.length; i += 1) {
      if (word[i] === guess) {
        guessed[i] = guess;
      }
    }
  } else {
    attempts -= 1;
    alert("Wrong guess!");
  }
}

if (attempts > 0 && !guessed.includes("_")) {
  alert(
    `Word : ${guessed.join(
      " "
    )}\nCongratulations! you've guessed the word ${word}`
  );
} else {
  alert("Failed to guess! the word was " + word);
}

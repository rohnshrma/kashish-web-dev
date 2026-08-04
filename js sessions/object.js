// data is stored in a key : value pair format

var car = {
  model: "mustang",
  brand: "ford",
  year: 2023,
  available_colors: ["Red", "Orange", "Yellow"],
};

car.year = 2020;
console.log(car);

car["isIndian"] = false;
console.log(car);

console.log(car.available_colors);
console.log(car["available_colors"]);

// constructor function
function CarCreator(model, brand, year) {
  // {}
  console.log(this);

  this.model = model;
  this.year = year;
  this.brand = brand;
  this.info = () => {
    console.log(`${this.model} by ${this.brand}`);
  };
}

var newCar = new CarCreator("mustang", "ford", 2020);
console.log(newCar);
newCar.info();

class Car {
  // {}

  constructor(model, brand, year) {
    this.model = model;
    this.year = year;
    this.brand = brand;
  }

  info() {
    console.log(`${this.model} by ${this.brand}`);
  }
}

var newCar = new Car("mustang", "ford", 2020);
console.log(newCar);
newCar.info();

// practice dataset: array of objects, for some/every/sort tasks

var products = [
  { name: "Wireless Mouse", price: 799, stock: 25, rating: 4.2 },
  { name: "Mechanical Keyboard", price: 3499, stock: 0, rating: 4.6 },
  { name: "USB-C Hub", price: 1299, stock: 12, rating: 3.8 },
  { name: "Webcam", price: 2199, stock: 5, rating: 4.0 },
  { name: "Laptop Stand", price: 999, stock: 40, rating: 4.4 },
  { name: "Monitor 24-inch", price: 8999, stock: 3, rating: 4.7 },
  { name: "Bluetooth Speaker", price: 1599, stock: 0, rating: 3.5 },
  { name: "External SSD 1TB", price: 5999, stock: 8, rating: 4.8 },
  { name: "Gaming Chair", price: 12999, stock: 2, rating: 4.1 },
  { name: "Desk Lamp", price: 599, stock: 60, rating: 3.9 },
];

// practical tasks: constructor functions

// 1. write a constructor function Student(name, age, marks) that stores the three as properties

function Student(name, age, marks) {
  this.name = name;
  this.marks = marks;
  this.age = age;
  this.info = () => `${this.name} (${this.age}) scored ${this.marks} marks.`;
}

var students = [];
for (var i = 1; i <= 5; i++) {
  var name = prompt("Enter name : ").toLowerCase();
  var marks = parseInt(prompt("Enter marks : "));
  var age = parseInt(prompt("Enter Age : "));

  students.push(new Student(name, age, marks));
}

students.forEach((student) => console.log(student));

// 2. add a method inside Student (like info() in CarCreator) that logs "name (age yrs) scored marks"
// 3. create 5 Student objects using "new" and store them in an array
// 4. add a method inside Student called hasPassed() that returns true if marks >= 40
// 5. add a method inside Student called grade() that returns "A"/"B"/"C"/"F" based on marks
// 6. write a constructor function BankAccount(owner, balance) with deposit(amount) and withdraw(amount) methods that update this.balance
// 7. in BankAccount, make withdraw() refuse (log an error, don't change balance) if amount > this.balance
// 8. write a constructor function Rectangle(width, height) with area() and perimeter() methods
// 9. log an object created with "new Rectangle(4, 5)" without calling new, and compare what "this" logs in both cases (see how CarCreator logs "this")

// practical tasks: classes

// 10. rewrite the Student constructor function above as a class Student
// 11. rewrite BankAccount as a class, keeping deposit()/withdraw() as methods
// 12. add a constructor to class Rectangle and a static method Rectangle.compare(r1, r2) that returns the bigger one by area
// 13. create a class Animal with name and sound properties and a method makeSound() that logs `${name} says ${sound}`
// 14. create a class Dog that extends Animal, sets sound to "Woof" automatically via its constructor calling super()
// 15. add a method fetch() only on Dog (not on Animal) and confirm a Dog instance can use both makeSound() and fetch()
// 16. add a get property (getter) to class Rectangle called area that computes width * height without needing area()
// 17. add a static counter to class Student that increments every time "new Student(...)" is called, and log the total count after creating several students

// practical tasks: comparing constructor functions vs classes

// 18. create the same object (same properties/methods) once with a constructor function and once with a class; log both and compare the output in the console
// 19. try calling the class version without "new" (e.g. "Student('Amit', 16, 80)") and note the error; try the same with the constructor-function version and note the difference
// 20. explain (as a comment) one similarity and one difference you observed between the constructor-function version and the class version

function Bankaccount(owner, balance) {
  this.owner = owner;
  this.balance = balance;
  this.mmb = 2000;

  this.checkMmb = () => {
    if (this.balance < this.mmb) {
      alert(
        `Note: Please mainitain a minimum balance of  ₹${this.mmb}\nYou're ${
          this.mmb - this.balance
        }`
      );
    }
  };

  this.withdrawl = (amount) => {
    if (amount <= this.balance) {
      this.balance -= amount;
      console.log(this.balance);
      this.checkMmb();
    } else {
      console.log("Insufficient funds");
    }
  };

  this.deposit = (amount) => {
    balance += amount;
    console.log(balance);
  };
}

let newowner = new Bankaccount("Kashish", 2000);
console.log(newowner);
newowner.withdrawl(2000);
newowner.deposit(500);

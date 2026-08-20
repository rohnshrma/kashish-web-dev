const fs = require("fs");
const fsp = require("fs/promises");

const FILENAME = "./hello.txt";

// fs.writeFileSync(FILENAME, "hello world this is john doe", "utf-8");

// const data = fs.readFileSync(FILENAME, { encoding: "utf-8" });

// console.log("From readfilesync : ", data);

// fs.appendFileSync(FILENAME, "\nthis is a newly added line!");
// console.log("after the append :", fs.readFileSync(FILENAME, "utf-8"));

// console.log("Does File Exists ? ", fs.existsSync(FILENAME));

// fs.readFile(FILENAME, "utf-8", (err, data) => {
//   if (err) {
//     console.log("error reading file ", err);
//     return;
//   }
//   console.log("File reading successfully : ", data);
// });

// console.log("I will run first");

// async function readWithPromise() {
//   try {
//     const content = await fsp.readFile(FILENAME, "utf-8");
//     console.log("Read File ", content);
//   } catch (err) {
//     console.log("Error", err);
//   }
// }

// readWithPromise();

// fs.unlinkSync("./hello.txt")
// await fsp.unlink("./hello.txt")

// fs.mkdirSync("./newFolerhehhehehe");
// fs.rmdirSync("./newFolerhehhehehe");
// fs.rmSync(".xyz", { recursive: true }); // remove folder  + content
console.log(fs.readdirSync("./"));

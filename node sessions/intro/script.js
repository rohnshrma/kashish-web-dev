// ============================================================
// NODE.JS FILE SYSTEM (fs) MODULE — NOTES + EXAMPLES
// ============================================================
// The "fs" module is a Node built-in (no npm install needed).
// It lets us create, read, update, and delete files/folders.
//
// Every fs method comes in (up to) 3 flavors:
//   1. Synchronous   -> fs.writeFileSync()   (blocks the thread, easy to use)
//   2. Callback-based -> fs.writeFile(cb)    (non-blocking, old-school async)
//   3. Promise-based  -> fs.promises.writeFile() / fsp.writeFile() (use with async/await)
//
// Rule of thumb: avoid Sync methods in real servers (they block
// every other request). They're fine for scripts/learning.
// ============================================================

const fs = require("fs");
const fsp = require("fs/promises"); // promise-based versions of fs methods

const FILENAME = "./hello.txt";

// ------------------------------------------------------------
// 1. WRITING TO A FILE — fs.writeFileSync(path, data, options)
// ------------------------------------------------------------
// - Creates the file if it doesn't exist.
// - OVERWRITES the entire file content if it does exist.
// - 3rd argument (options) can be "utf-8" or an object like { encoding: "utf-8" }.
fs.writeFileSync(FILENAME, "Hello World!", "utf-8");

// ------------------------------------------------------------
// 2. READING A FILE — fs.readFileSync(path, options)
// ------------------------------------------------------------
// - Without an encoding, this returns a raw Buffer (binary data).
// - Passing { encoding: "utf-8" } returns a readable string instead.
const data = fs.readFileSync(FILENAME, { encoding: "utf-8" });
console.log("readFileSync:", data);

// ------------------------------------------------------------
// 3. APPENDING TO A FILE — fs.appendFileSync(path, data)
// ------------------------------------------------------------
// - Adds data to the END of the file instead of overwriting it.
// - Useful for logs, adding new lines, etc.
fs.appendFileSync(FILENAME, "\nAppended line!");
console.log("after append:", fs.readFileSync(FILENAME, "utf-8"));

// ------------------------------------------------------------
// 4. CHECKING IF A FILE/FOLDER EXISTS — fs.existsSync(path)
// ------------------------------------------------------------
// - Returns true/false. Good to check before reading/deleting.
console.log("file exists?", fs.existsSync(FILENAME));

// ------------------------------------------------------------
// 5. CALLBACK-BASED (ASYNC, NON-BLOCKING) FILE OPERATIONS
// ------------------------------------------------------------
// - These do NOT block the rest of the program while running.
// - Node calls the callback function once the operation finishes.
// - Callback signature is always: (err, result) => { ... }
fs.readFile(FILENAME, "utf-8", (err, data) => {
  if (err) {
    console.log("Error reading file:", err);
    return;
  }
  console.log("readFile (callback):", data);
});

// This line runs BEFORE the callback above finishes,
// because readFile() doesn't block the program.
console.log("This may print before the async readFile result!");

// ------------------------------------------------------------
// 6. PROMISE-BASED FILE OPERATIONS (fs/promises) + async/await
// ------------------------------------------------------------
// - Cleanest way to work with fs — no callback pyramids.
// - Wrap in an async function so we can use "await".
async function readWithPromises() {
  try {
    const content = await fsp.readFile(FILENAME, "utf-8");
    console.log("readFile (promise/await):", content);
  } catch (err) {
    console.log("Error:", err);
  }
}
readWithPromises();

// ------------------------------------------------------------
// 7. DELETING A FILE — fs.unlinkSync(path) / fsp.unlink(path)
// ------------------------------------------------------------
// fs.unlinkSync("./temp.txt");   // sync version
// await fsp.unlink("./temp.txt"); // promise version (inside async fn)

// ------------------------------------------------------------
// 8. WORKING WITH FOLDERS
// ------------------------------------------------------------
// fs.mkdirSync("./newFolder");            // create a folder
// fs.rmdirSync("./newFolder");            // remove an empty folder (old API)
// fs.rmSync("./newFolder", { recursive: true }); // remove folder + contents
// fs.readdirSync("./");                   // list files/folders in a directory

// ------------------------------------------------------------
// 9. RENAMING / MOVING A FILE — fs.renameSync(oldPath, newPath)
// ------------------------------------------------------------
// fs.renameSync("./hello.txt", "./greetings.txt");

// ------------------------------------------------------------
// 10. USING A CLASS TO WRAP FILE OPERATIONS (OOP style example)
// ------------------------------------------------------------
class ManageFile {
  constructor(path) {
    this.FILENAME = path;
  }

  // Callback style — logs data once file is read
  readFile() {
    fs.readFile(this.FILENAME, "utf-8", (err, data) => {
      if (err) console.log(err);
      else console.log("ManageFile.readFile:", data);
    });
  }

  // Sync style — returns data directly
  readFileSync() {
    return fs.readFileSync(this.FILENAME, "utf-8");
  }
}

const fileManager = new ManageFile(FILENAME);
fileManager.readFile(); // async, logs later
console.log("ManageFile.readFileSync:", fileManager.readFileSync());

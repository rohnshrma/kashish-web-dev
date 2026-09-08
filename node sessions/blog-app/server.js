import express from "express";
import path from "node:path";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import { config } from "dotenv";
import bcrypt from "bcryptjs";

config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3003;

/* ---------- setup ---------- */
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

/* ---------- data (in memory for now) ---------- */
const posts = [];
const users = [];

/* ---------- pages ---------- */
app.get("/", (req, res) => {
  res.render("home", { posts: posts.slice(-3).reverse() });
});

app.get("/blogs", (req, res) => {
  res.render("blogs", { posts: [...posts].reverse() });
});

// app.get("/compose", (req, res) => {
//   res.render("compose", { error: null });
// });

app.post("/compose", (req, res) => {
  const { title, author, content } = req.body;
  posts.push({ title, author, content, createdAt: new Date() });
  res.redirect("/blogs");
});

/* ---------- auth ---------- */
app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log("No User with this email exists");
      res.redirect("/register");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      console.log("Invalid password");
      res.redirect("/login");
    }
    res.render("compose");
  } catch (err) {
    console.log(err);
    res.redirect("/register");
  }
});

app.get("/register", (req, res) => {
  res.render("register", { error: null });
});

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const newUser = await User.create({
      email: email,
      password: await bcrypt.hash(password, 10),
    });

    console.log(newUser);

    res.render("compose");
  } catch (err) {
    console.log(err);
    res.redirect("/register");
  }
});

/* ---------- listen ---------- */
app.listen(PORT, () => {
  console.log(`Inkwell running on http://localhost:${PORT}`);
});

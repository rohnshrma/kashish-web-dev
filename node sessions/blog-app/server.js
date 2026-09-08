import express from "express";
import path from "node:path";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import { config } from "dotenv";
import bcrypt from "bcryptjs";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3003;

/* ---------- setup ---------- */
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, {
            message: "No user with this email exists",
          });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return done(null, false, { message: "Invalid password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(passport.initialize());
app.use(passport.session());

function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

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

app.get("/compose", ensureAuth, (req, res) => {
  res.render("compose", { error: null });
});

app.post("/compose", (req, res) => {
  const { title, author, content } = req.body;
  posts.push({ title, author, content, createdAt: new Date() });
  res.redirect("/blogs");
});

/* ---------- auth ---------- */
app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/compose",
    failureRedirect: "/login",
  })
);

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

    res.redirect("login");
  } catch (err) {
    console.log(err);
    res.redirect("/register");
  }
});

/* ---------- listen ---------- */
app.listen(PORT, () => {
  console.log(`Inkwell running on http://localhost:${PORT}`);
});

import express from "express";
import methodOverride from "method-override";
import morgan from "morgan";
const app = express();

const PORT = 3002;

let tasks = [];

// middlewares

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// routes
app
  .route("/")
  .get((req, res) => {
    res.render("Home", {
      title: "To Do List",
      tasks: tasks,
    });
  })
  .post((req, res) => {
    const { task_name } = req.body;
    tasks.push(task_name);
    res.redirect("/"); // get request
  });

app.route("/delete/:id").delete((req, res) => {
  const id = req.params.id;

  tasks = tasks.filter((task, index) => index !== parseInt(id));

  res.redirect("/");
});

app.listen(PORT, () => console.log("Server started on port : ", PORT));

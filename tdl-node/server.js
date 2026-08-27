import express from "express";
import methodOverride from "method-override";
import morgan from "morgan";
import connectDB from "./config/db.js";
import Task from "./models/task.js";
const app = express();

const PORT = 3002;

connectDB();


// middlewares

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// routes
app
  .route("/")
  .get(async(req, res) => {
    try{
      const tasks = await Task.find({})
      
      console.log("Tasks =>",tasks)
      res.render("Home", {
        title: "To Do List",
        tasks: tasks,
      });


    }catch(err){
        console.log("Error =>", err);
      res.redirect("/");
    }
  })
  .post(async (req, res) => {
    try {
      const { task_name } = req.body;

      const newTask = new Task({
        name: task_name,
      });

      await newTask.save();
      console.log("Saved task ");
      res.redirect("/");
    } catch (err) {
      console.log("Error =>", err);
      res.redirect("/");
    }
  });

app.route("/delete/:id").delete(async(req, res) => {
  try{
    const id = req.params.id;
    await Task.findByIdAndDelete(id)
    console.log("Task deleted =>", id)
    res.redirect("/")
  }catch(err){
      console.log("Error =>", err);
      res.redirect("/");
  }

});

app.listen(PORT, () => console.log("Server started on port : ", PORT));

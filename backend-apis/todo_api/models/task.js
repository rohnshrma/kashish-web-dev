import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3 },
  },
  { timestamps: true },
);

const Task = mongoose.model("Task", taskSchema);

export default Task;

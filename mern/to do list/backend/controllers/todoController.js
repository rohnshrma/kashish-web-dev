import Todo from "../models/Todo.js";

// create
export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Task title is required ",
        status: "failed",
        data: null,
      });
    }

    const todo = await Todo.create({ title });

    res.status(201).json({
      message: "Task Added Successfully",
      status: "Success",
      data: todo,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// read
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });

    res.status(200).json({
      data: todos,
      message: "Tasks Fetched Successfully",
      status: "success",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update
export const updateTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;
    const updates = {};

    if (title !== undefined) {
      if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
          message: "Task title cannot be empty",
          status: "failed",
          data: null,
        });
      }
      updates.title = title.trim();
    }

    if (completed !== undefined) {
      if (typeof completed !== "boolean") {
        return res.status(400).json({
          message: "Completion status must be true or false",
          status: "failed",
          data: null,
        });
      }

      updates.completed = completed;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "Please provide a title or completion status",
      });
    }

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true },
    );

    if (!todo) {
      return res
        .status(404)
        .json({ message: "Task not found", status: "failed", data: null });
    }

    res.status(200).json({
      data: todo,
      message: "Task updated successfully",
      status: "success",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res
        .status(404)
        .json({ message: "Task not found", status: "failed", data: null });
    }

    res.status(200).json({
      message: "Task Deleted Successfully",
      status: "Success",
      id: todo._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

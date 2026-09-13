import Task from "../models/task.js";

export const GET_TASKS = async (req, res) => {
  try {
    const tasks = await Task.find({});

    if (!tasks) {
      return res
        .status(404)
        .json({ message: "No Tasks Found", status: "failed", data: null });
    }

    return res.status(200).json({
      message: "Tasks Fetched Successfully",
      status: "success",
      data: tasks,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
      status: "failed",
    });
  }
};
export const ADD_TASK = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.length < 3 || name.trim() === "") {
      return res.status(400).json({
        message: "Name Cannot Be Empty or less than 3 characters",
        status: "failed",
        data: null,
      });
    }

    const task = await Task.create({
      name: name,
    });

    return res.status(200).json({
      message: "Task Added Successfully",
      status: "success",
      data: task,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
      status: "failed",
    });
  }
};
export const UPDATE_TASK = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.length < 3 || name.trim() === "") {
      return res.status(400).json({
        message: "Name Cannot Be Empty or less than 3 characters",
        status: "failed",
        data: null,
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "No Task Found with the given id",
        status: "failed",
        data: null,
      });
    }

    task.name = name;

    await task.save();

    return res.status(200).json({
      message: "Task Updated Successfully",
      status: "success",
      data: task,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
      status: "failed",
    });
  }
};
export const DELETE_TASK = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        message: "No Task Found with the given id",
        status: "failed",
        data: null,
      });
    }

    return res.status(200).json({
      message: "Task Deleted Successfully",
      status: "success",
      data: task,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
      status: "failed",
    });
  }
};

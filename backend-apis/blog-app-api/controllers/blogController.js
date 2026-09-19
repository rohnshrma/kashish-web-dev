import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const GET_BLOGS = async (req, res) => {
  try {
    const blogs = await Blog.find({});

    res.status(200).json({
      status: "success",
      data: blogs.length > 0 ? blogs : [],
      message: "blogs fetched successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
      message: "failed to get blogs",
      status: "failed",
    });
  }
};
export const ADD_BLOG = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "failed",
        data: null,
      });
    }

    const { title, description } = req.body;

    if ((!title, !description)) {
      return res.status(400).json({
        message: "title and description fields are required",
        status: "failed",
        data: null,
      });
    }

    const blog = new Blog({
      title,
      description,
      user: user._id,
    });

    await blog.save();

    return res.status(201).json({
      message: "blog added successfully",
      status: "success",
      data: blog,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
      message: "failed to add blog",
      status: "failed",
    });
  }
};
export const REMOVE_BLOG = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "failed",
        data: null,
      });
    }

    const { id } = req.params;

    const blog = await Blog.findOneAndDelete({
      _id: id,
      user: user._id,
    });

    return res.status(200).json({
      message: "blog deleted successfully",
      status: "success",
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
      message: "failed to delete blog",
      status: "failed",
    });
  }
};
export const UPDATE_BLOG = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    console.log(user);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "failed",
        data: null,
      });
    }

    const { id } = req.params;

    const { title, description } = req.body;
    console.log(title, description);

    const blog = await Blog.findOne({
      _id: id,
      user: user._id,
    });
    console.log(blog);

    blog.title = title;
    blog.description = description;

    await blog.save();
    console.log(title, description);

    return res.status(200).json({
      message: "blog updated successfully",
      status: "success",
      data: blog,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
      message: "failed to updated blog",
      status: "failed",
    });
  }
};

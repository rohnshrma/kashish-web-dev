import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const REGISTER_USER = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    if (!email || !password)
      return res.status(400).json({
        status: "failed",
        message: "Email and Password fields are required!",
        user: null,
      });

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        status: "failed",
        message: "User already exists! Try logging in",
        user: null,
      });
    }

    const newUser = new User({
      email,
      password: await bcrypt.hash(password, 10),
    });

    await newUser.save();

    console.log(newUser);

    const token = jwt.sign({ user_id: newUser._id }, process.env.JWT_SECRET);

    console.log(token);

    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        token,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      message: "failed to register user",
      error: err,
    });
  }
};

export const LOGIN_USER = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    if (!email || !password)
      return res.status(400).json({
        status: "failed",
        message: "Email and Password fields are required!",
        user: null,
      });

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User doesn't exists! Try registering a new user",
        user: null,
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        status: "failed",
        message: "Incorrect Password!",
        user: null,
      });
    }

    console.log("logging in user", user);

    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET);

    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      user: {
        id: user._id,
        email: user.email,
        token,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      message: "failed to login user",
      error: err,
    });
  }
};

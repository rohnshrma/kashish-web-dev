import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import AppError from "../utils/AppError.js";
import { sendSuccess } from "../utils/respond.js";
import { requireFields } from "../middleware/validate.js";

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

// POST /api/auth/register  (role is never read from the body)
export const register = async (req, res) => {
  requireFields(req.body, ["name", "email", "password"]);
  const { name, email, password, phone } = req.body;

  const user = await User.create({ name, email, password, phone });

  sendSuccess(res, 201, "Registered successfully", {
    token: signToken(user),
    user,
  });
};

// POST /api/auth/login
export const login = async (req, res) => {
  requireFields(req.body, ["email", "password"]);
  const { email, password } = req.body;

  const user = await User.findOne({ email: String(email).toLowerCase() }).select(
    "+password",
  );

  // same message for wrong email and wrong password
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError("Invalid credentials", 401);
  }

  sendSuccess(res, 200, "Logged in successfully", {
    token: signToken(user),
    user,
  });
};

// GET /api/auth/me
export const getMe = async (req, res) => {
  sendSuccess(res, 200, "Profile fetched successfully", req.user);
};

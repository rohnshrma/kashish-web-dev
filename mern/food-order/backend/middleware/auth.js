import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

const readToken = (req) => {
  const header = req.headers.authorization;
  if (header && header.startsWith("Bearer ")) return header.split(" ")[1];
  return null;
};

const loadUser = async (token) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return User.findById(decoded.id);
};

// Must be logged in
export const auth = async (req, res, next) => {
  const token = readToken(req);
  if (!token) throw new AppError("Please log in first", 401);

  let user;
  try {
    user = await loadUser(token);
  } catch {
    throw new AppError("Invalid or expired token, please log in again", 401);
  }
  if (!user) throw new AppError("This account no longer exists", 401);

  req.user = user;
  next();
};

// Logged in is optional (public routes that behave differently for admin)
export const optionalAuth = async (req, res, next) => {
  const token = readToken(req);
  if (token) {
    try {
      req.user = await loadUser(token);
    } catch {
      // bad token on a public route: treat as logged out
    }
  }
  next();
};

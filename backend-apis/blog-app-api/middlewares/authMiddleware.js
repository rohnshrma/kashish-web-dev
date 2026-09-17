import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const AUTH_MIDDLEWARE = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        status: "failed",
        message: "Authorization token is required",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid Authorization format!",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user_id).select("-password");

    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "User not found!",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: "failed",

        message: "Invalid token",
      });
    }

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "failed",

        message: "Token has expired",
      });
    }

    return res.status(500).json({
      status: "failed",

      message: "Authentication failed",
    });
  }
};

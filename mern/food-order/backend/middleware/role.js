import AppError from "../utils/AppError.js";

// authorize("admin") / authorize("user") / authorize("admin", "user")
export const authorize =
  (...roles) =>
  (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError("You are not allowed to do this", 403));
    }
    next();
  };

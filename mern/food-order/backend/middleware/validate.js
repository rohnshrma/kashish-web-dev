import mongoose from "mongoose";
import AppError from "../utils/AppError.js";

export const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// Throws a 400 listing the fields that are missing or blank
export const requireFields = (body, fields) => {
  const missing = fields.filter((f) => {
    const v = body?.[f];
    return v === undefined || v === null || (typeof v === "string" && !v.trim());
  });
  if (missing.length) {
    throw new AppError(`Please provide: ${missing.join(", ")}`, 400);
  }
};

// Route middleware: validateObjectId("id") rejects a bad :id with 400 instead of crashing
export const validateObjectId =
  (...params) =>
  (req, res, next) => {
    for (const p of params) {
      if (!isValidId(req.params[p])) {
        return next(new AppError(`Invalid ${p}`, 400));
      }
    }
    next();
  };

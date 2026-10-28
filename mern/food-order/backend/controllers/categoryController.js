import Category from "../models/Category.js";
import { sendSuccess } from "../utils/respond.js";

// GET /api/categories  (categories come from seed.js)
export const getCategories = async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  sendSuccess(res, 200, "Categories fetched successfully", categories);
};

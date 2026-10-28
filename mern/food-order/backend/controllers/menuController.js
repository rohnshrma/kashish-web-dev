import MenuItem from "../models/MenuItem.js";
import Category from "../models/Category.js";
import AppError from "../utils/AppError.js";
import {
  sendSuccess,
  getPagination,
  paginationMeta,
} from "../utils/respond.js";
import { requireFields, isValidId } from "../middleware/validate.js";

const SORTS = {
  price: "price",
  "-price": "-price",
  name: "name",
  "-name": "-name",
};

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// GET /api/menu
export const getMenu = async (req, res) => {
  const { category, isVeg, search, minPrice, maxPrice, sort } = req.query;
  const filter = {};

  // users only see available items, admin sees everything
  if (req.user?.role !== "admin") filter.isAvailable = true;

  if (category && isValidId(category)) filter.category = category;
  if (isVeg === "true" || isVeg === "false") filter.isVeg = isVeg === "true";
  if (search && search.trim()) {
    filter.name = { $regex: escapeRegex(search.trim()), $options: "i" };
  }

  const price = {};
  if (minPrice !== undefined && !Number.isNaN(Number(minPrice))) {
    price.$gte = Number(minPrice);
  }
  if (maxPrice !== undefined && !Number.isNaN(Number(maxPrice))) {
    price.$lte = Number(maxPrice);
  }
  if (Object.keys(price).length) filter.price = price;

  const { page, limit, skip } = getPagination(req.query);

  const [items, total] = await Promise.all([
    MenuItem.find(filter)
      .populate("category", "name")
      .sort(SORTS[sort] || "-createdAt")
      .skip(skip)
      .limit(limit),
    MenuItem.countDocuments(filter),
  ]);

  sendSuccess(
    res,
    200,
    "Menu fetched successfully",
    items,
    paginationMeta(page, limit, total),
  );
};

const ensureCategory = async (id) => {
  if (!isValidId(id) || !(await Category.exists({ _id: id }))) {
    throw new AppError("Category not found", 400);
  }
};

const pickFields = (body) => {
  const fields = {};
  [
    "name",
    "description",
    "price",
    "category",
    "image",
    "isVeg",
    "isAvailable",
    "preparationTime",
  ].forEach((f) => {
    if (body[f] !== undefined) fields[f] = body[f];
  });
  return fields;
};

// POST /api/menu  (admin)
export const createMenuItem = async (req, res) => {
  requireFields(req.body, ["name", "price", "category"]);
  await ensureCategory(req.body.category);

  const item = await MenuItem.create(pickFields(req.body));
  await item.populate("category", "name");

  sendSuccess(res, 201, "Menu item created successfully", item);
};

// PUT /api/menu/:id  (admin)
export const updateMenuItem = async (req, res) => {
  const fields = pickFields(req.body);
  if (fields.category !== undefined) await ensureCategory(fields.category);

  const item = await MenuItem.findByIdAndUpdate(req.params.id, fields, {
    new: true,
    runValidators: true,
  }).populate("category", "name");

  if (!item) throw new AppError("Menu item not found", 404);

  sendSuccess(res, 200, "Menu item updated successfully", item);
};

// PATCH /api/menu/:id/availability  (admin) - flips it, or sets it if isAvailable is sent
export const toggleAvailability = async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) throw new AppError("Menu item not found", 404);

  item.isAvailable =
    typeof req.body?.isAvailable === "boolean"
      ? req.body.isAvailable
      : !item.isAvailable;
  await item.save();
  await item.populate("category", "name");

  sendSuccess(
    res,
    200,
    item.isAvailable ? "Item is now available" : "Item marked as sold out",
    item,
  );
};

// DELETE /api/menu/:id  (admin)
export const deleteMenuItem = async (req, res) => {
  const item = await MenuItem.findByIdAndDelete(req.params.id);
  if (!item) throw new AppError("Menu item not found", 404);

  sendSuccess(res, 200, "Menu item deleted successfully", { _id: item._id });
};

import Cart from "../models/Cart.js";
import MenuItem from "../models/MenuItem.js";
import AppError from "../utils/AppError.js";
import { sendSuccess, round2 } from "../utils/respond.js";
import { requireFields, isValidId } from "../middleware/validate.js";

// Every cart route returns the WHOLE cart in this shape:
// { items: [{ menuItem: { _id, name, price, image }, quantity, lineTotal }], total }
const buildCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId }).populate(
    "items.menuItem",
    "name price image isAvailable",
  );

  // a menu item may have been deleted after it was added
  const items = (cart?.items || [])
    .filter((i) => i.menuItem)
    .map((i) => ({
      menuItem: {
        _id: i.menuItem._id,
        name: i.menuItem.name,
        price: i.menuItem.price,
        image: i.menuItem.image,
      },
      quantity: i.quantity,
      lineTotal: round2(i.menuItem.price * i.quantity),
    }));

  const total = round2(items.reduce((sum, i) => sum + i.lineTotal, 0));
  return { items, total };
};

const getAvailableItem = async (menuItemId) => {
  if (!isValidId(menuItemId)) throw new AppError("Invalid menuItemId", 400);
  const item = await MenuItem.findById(menuItemId);
  if (!item) throw new AppError("Menu item not found", 404);
  if (!item.isAvailable) {
    throw new AppError(`${item.name} is sold out right now`, 400);
  }
  return item;
};

const parseQuantity = (value, min) => {
  const quantity = Number(value);
  if (!Number.isInteger(quantity) || quantity < min) {
    throw new AppError(
      min === 0
        ? "Quantity must be a whole number, 0 or more"
        : "Quantity must be a whole number, 1 or more",
      400,
    );
  }
  return quantity;
};

// GET /api/cart
export const getCart = async (req, res) => {
  sendSuccess(res, 200, "Cart fetched successfully", await buildCart(req.user._id));
};

// POST /api/cart   { menuItemId, quantity }
export const addToCart = async (req, res) => {
  requireFields(req.body, ["menuItemId"]);
  const quantity = parseQuantity(req.body.quantity ?? 1, 1);
  const item = await getAvailableItem(req.body.menuItemId);

  const cart =
    (await Cart.findOne({ user: req.user._id })) ||
    new Cart({ user: req.user._id, items: [] });

  const existing = cart.items.find((i) => i.menuItem.equals(item._id));
  if (existing) existing.quantity += quantity;
  else cart.items.push({ menuItem: item._id, quantity });

  await cart.save();
  sendSuccess(res, 200, "Added to cart", await buildCart(req.user._id));
};

// PUT /api/cart/:menuItemId   { quantity }   (0 removes)
export const updateQuantity = async (req, res) => {
  requireFields(req.body, ["quantity"]);
  const quantity = parseQuantity(req.body.quantity, 0);

  const cart = await Cart.findOne({ user: req.user._id });
  const entry = cart?.items.find((i) => i.menuItem.equals(req.params.menuItemId));
  if (!entry) throw new AppError("That item is not in your cart", 404);

  if (quantity === 0) {
    cart.items = cart.items.filter((i) => !i.menuItem.equals(req.params.menuItemId));
  } else {
    await getAvailableItem(req.params.menuItemId);
    entry.quantity = quantity;
  }

  await cart.save();
  sendSuccess(res, 200, "Cart updated", await buildCart(req.user._id));
};

// DELETE /api/cart/:menuItemId
export const removeItem = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (cart) {
    cart.items = cart.items.filter((i) => !i.menuItem.equals(req.params.menuItemId));
    await cart.save();
  }
  sendSuccess(res, 200, "Item removed from cart", await buildCart(req.user._id));
};

// DELETE /api/cart
export const clearCart = async (req, res) => {
  await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
  sendSuccess(res, 200, "Cart cleared", await buildCart(req.user._id));
};

import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Table from "../models/Table.js";
import AppError from "../utils/AppError.js";
import { sendSuccess, round2 } from "../utils/respond.js";
import { requireFields, isValidId } from "../middleware/validate.js";

const TAX_RATE = 0.05;
const DELIVERY_FEE = 40;
const FREE_DELIVERY_ABOVE = 500;

export const freeTable = (order) =>
  order.orderType === "dine-in" && order.table
    ? Table.findByIdAndUpdate(order.table, { status: "available" })
    : null;

// POST /api/orders
export const placeOrder = async (req, res) => {
  const { orderType, paymentMethod = "cash" } = req.body;

  if (!["dine-in", "delivery"].includes(orderType)) {
    throw new AppError("Order type must be dine-in or delivery", 400);
  }
  if (!["cash", "online"].includes(paymentMethod)) {
    throw new AppError("Payment method must be cash or online", 400);
  }

  // 1. load the cart
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.menuItem");
  const cartItems = (cart?.items || []).filter((i) => i.menuItem);
  if (cartItems.length === 0) throw new AppError("Your cart is empty", 400);

  // 2. every item must still be available; read the CURRENT price from the DB
  const items = cartItems.map((i) => {
    if (!i.menuItem.isAvailable) {
      throw new AppError(`${i.menuItem.name} is sold out right now`, 400);
    }
    return {
      menuItem: i.menuItem._id,
      name: i.menuItem.name,
      price: i.menuItem.price,
      quantity: i.quantity,
    };
  });

  // 3. validate the order-type specific details
  const details = {};
  let tableId = null;

  if (orderType === "dine-in") {
    requireFields(req.body, ["tableId", "guests", "reservationTime"]);
    const guests = Number(req.body.guests);
    const reservationTime = new Date(req.body.reservationTime);

    if (!Number.isInteger(guests) || guests < 1) {
      throw new AppError("Guests must be a whole number, 1 or more", 400);
    }
    if (!isValidId(req.body.tableId)) throw new AppError("Invalid tableId", 400);
    if (Number.isNaN(reservationTime.getTime())) {
      throw new AppError("Reservation time is not a valid date", 400);
    }
    if (reservationTime <= new Date()) {
      throw new AppError("Reservation time must be in the future", 400);
    }

    const table = await Table.findById(req.body.tableId);
    if (!table) throw new AppError("Table not found", 404);
    if (table.capacity < guests) {
      throw new AppError(
        `Table ${table.tableNumber} seats only ${table.capacity} guests`,
        400,
      );
    }

    tableId = table._id;
    Object.assign(details, { table: table._id, guests, reservationTime });
  } else {
    const address = req.body.deliveryAddress || {};
    requireFields(address, ["street", "city", "pincode", "phone"]);
    details.deliveryAddress = {
      street: address.street.trim(),
      city: address.city.trim(),
      pincode: String(address.pincode).trim(),
      phone: String(address.phone).trim(),
    };
  }

  // 4. totals are always calculated here, never taken from the client
  const subtotal = round2(items.reduce((s, i) => s + i.price * i.quantity, 0));
  const tax = round2(subtotal * TAX_RATE);
  const deliveryFee =
    orderType === "delivery" && subtotal <= FREE_DELIVERY_ABOVE ? DELIVERY_FEE : 0;
  const totalAmount = round2(subtotal + tax + deliveryFee);

  // reserve the table atomically so two people cannot book it together
  if (tableId) {
    const reserved = await Table.findOneAndUpdate(
      { _id: tableId, status: "available" },
      { status: "reserved" },
    );
    if (!reserved) throw new AppError("That table is already reserved", 409);
  }

  // 5. save the order, then clear the cart
  let order;
  try {
    order = await Order.create({
      user: req.user._id,
      items,
      orderType,
      subtotal,
      tax,
      deliveryFee,
      totalAmount,
      paymentMethod,
      ...details,
    });
  } catch (err) {
    if (tableId) await Table.findByIdAndUpdate(tableId, { status: "available" });
    throw err;
  }

  cart.items = [];
  await cart.save();

  // 6. return the saved order
  await order.populate("table");
  sendSuccess(res, 201, "Order placed successfully", order);
};

// GET /api/orders/my?status=&orderType=
export const getMyOrders = async (req, res) => {
  const { status, orderType } = req.query;
  const filter = { user: req.user._id };
  if (status) filter.status = status;
  if (orderType) filter.orderType = orderType;

  const orders = await Order.find(filter).populate("table").sort({ createdAt: -1 });
  sendSuccess(res, 200, "Orders fetched successfully", orders);
};

const findOwnOrder = async (req) => {
  const order = await Order.findById(req.params.id).populate("table");
  if (!order) throw new AppError("Order not found", 404);
  if (!order.user.equals(req.user._id)) {
    throw new AppError("You are not allowed to view this order", 403);
  }
  return order;
};

// GET /api/orders/:id
export const getOrder = async (req, res) => {
  sendSuccess(res, 200, "Order fetched successfully", await findOwnOrder(req));
};

// PATCH /api/orders/:id/cancel   { reason? }
export const cancelOrder = async (req, res) => {
  const order = await findOwnOrder(req);

  if (order.status !== "placed") {
    throw new AppError(
      `Only a placed order can be cancelled. This one is ${order.status}`,
      400,
    );
  }

  order.status = "cancelled";
  if (req.body?.reason) order.cancelReason = String(req.body.reason).trim();
  await order.save();
  await freeTable(order);

  sendSuccess(res, 200, "Order cancelled", order);
};

import Order, { ORDER_STATUSES } from "../models/Order.js";
import AppError from "../utils/AppError.js";
import {
  sendSuccess,
  getPagination,
  paginationMeta,
} from "../utils/respond.js";
import { freeTable } from "./orderController.js";

// the only allowed next step for each order type
const NEXT_STATUS = {
  "dine-in": {
    placed: "confirmed",
    confirmed: "preparing",
    preparing: "ready",
    ready: "served",
    served: "completed",
  },
  delivery: {
    placed: "confirmed",
    confirmed: "preparing",
    preparing: "ready",
    ready: "out-for-delivery",
    "out-for-delivery": "delivered",
  },
};

const CANCELLABLE = ["placed", "confirmed"];

const POPULATE = [{ path: "user", select: "name email phone" }, { path: "table" }];

// GET /api/admin/orders?status=&orderType=&date=YYYY-MM-DD&page=
export const getAllOrders = async (req, res) => {
  const { status, orderType, date } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (orderType) filter.orderType = orderType;

  if (date) {
    const start = new Date(`${date}T00:00:00`);
    if (Number.isNaN(start.getTime())) {
      throw new AppError("Date must look like 2026-10-28", 400);
    }
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    filter.createdAt = { $gte: start, $lt: end };
  }

  const { page, limit, skip } = getPagination(req.query);

  const [orders, total] = await Promise.all([
    Order.find(filter)
      .populate(POPULATE)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Order.countDocuments(filter),
  ]);

  sendSuccess(
    res,
    200,
    "Orders fetched successfully",
    orders,
    paginationMeta(page, limit, total),
  );
};

// PATCH /api/admin/orders/:id/status   { status }
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  if (!ORDER_STATUSES.includes(status)) {
    throw new AppError("Please send a valid status", 400);
  }

  const order = await Order.findById(req.params.id);
  if (!order) throw new AppError("Order not found", 404);

  const allowed =
    status === "cancelled"
      ? CANCELLABLE.includes(order.status)
      : NEXT_STATUS[order.orderType][order.status] === status;

  if (!allowed) {
    throw new AppError(
      `A ${order.orderType} order cannot move from ${order.status} to ${status}`,
      400,
    );
  }

  order.status = status;
  await order.save();

  if (status === "completed" || status === "cancelled") await freeTable(order);

  await order.populate(POPULATE);
  sendSuccess(res, 200, `Order marked as ${status}`, order);
};

// PATCH /api/admin/orders/:id/payment   (mark a cash order as paid)
export const markPaid = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) throw new AppError("Order not found", 404);

  if (order.paymentMethod !== "cash") {
    throw new AppError("Only cash orders are marked as paid by the admin", 400);
  }
  if (order.paymentStatus === "paid") {
    throw new AppError("This order is already paid", 400);
  }

  order.paymentStatus = "paid";
  await order.save();

  await order.populate(POPULATE);
  sendSuccess(res, 200, "Payment marked as paid", order);
};

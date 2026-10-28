import Table from "../models/Table.js";
import AppError from "../utils/AppError.js";
import { sendSuccess } from "../utils/respond.js";

// GET /api/tables/available?guests=4&time=...
// Tables are seeded; there is no table CRUD.
export const getAvailableTables = async (req, res) => {
  const { guests, time } = req.query;
  const filter = { status: "available" };

  if (guests !== undefined) {
    const count = Number(guests);
    if (!Number.isInteger(count) || count < 1) {
      throw new AppError("Guests must be a whole number, 1 or more", 400);
    }
    filter.capacity = { $gte: count };
  }

  if (time !== undefined && Number.isNaN(new Date(time).getTime())) {
    throw new AppError("Time is not a valid date", 400);
  }

  const tables = await Table.find(filter).sort({ capacity: 1, tableNumber: 1 });
  sendSuccess(res, 200, "Available tables fetched successfully", tables);
};

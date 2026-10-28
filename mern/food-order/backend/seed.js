// Run with: npm run seed   (safe to run more than once)
import mongoose from "mongoose";
import "./config/env.js";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Category from "./models/Category.js";
import Table from "./models/Table.js";

const CATEGORIES = [
  { name: "Starters", description: "Light bites to begin with" },
  { name: "Main Course", description: "Full meals" },
  { name: "Desserts", description: "Something sweet" },
  { name: "Beverages", description: "Hot and cold drinks" },
];

const TABLES = [
  { tableNumber: 1, capacity: 2 },
  { tableNumber: 2, capacity: 2 },
  { tableNumber: 3, capacity: 4 },
  { tableNumber: 4, capacity: 4 },
  { tableNumber: 5, capacity: 6 },
];

const seed = async () => {
  await connectDB();

  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env first");
    process.exit(1);
  }

  if (await User.exists({ role: "admin" })) {
    console.log("Admin already exists, skipped");
  } else {
    await User.create({
      name: ADMIN_NAME || "Restaurant Admin",
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: "admin",
    });
    console.log("Admin created:", ADMIN_EMAIL);
  }

  for (const category of CATEGORIES) {
    const result = await Category.updateOne(
      { name: category.name },
      { $setOnInsert: category },
      { upsert: true },
    );
    if (result.upsertedCount) console.log("Category added:", category.name);
  }

  for (const table of TABLES) {
    const result = await Table.updateOne(
      { tableNumber: table.tableNumber },
      { $setOnInsert: table },
      { upsert: true },
    );
    if (result.upsertedCount) console.log("Table added:", table.tableNumber);
  }

  console.log("Seeding done");
  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

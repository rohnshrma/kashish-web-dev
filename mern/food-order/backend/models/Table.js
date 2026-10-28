import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    tableNumber: { type: Number, required: true, unique: true },
    capacity: { type: Number, required: true, min: 1 },
    status: {
      type: String,
      enum: ["available", "reserved", "occupied"],
      default: "available",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Table", tableSchema);

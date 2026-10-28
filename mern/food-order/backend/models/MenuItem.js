import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    description: { type: String, trim: true, default: "" },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    image: { type: String, trim: true, default: "" },
    isVeg: { type: Boolean, default: true },
    isAvailable: { type: Boolean, default: true },
    preparationTime: { type: Number, min: 0, default: 15 },
  },
  { timestamps: true },
);

export default mongoose.model("MenuItem", menuItemSchema);

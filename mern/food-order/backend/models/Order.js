import mongoose from "mongoose";

export const ORDER_STATUSES = [
  "placed",
  "confirmed",
  "preparing",
  "ready",
  "out-for-delivery",
  "delivered",
  "served",
  "completed",
  "cancelled",
];

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // name and price are a snapshot, so later menu edits do not change old orders
    items: [
      {
        _id: false,
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    orderType: { type: String, enum: ["dine-in", "delivery"], required: true },
    status: { type: String, enum: ORDER_STATUSES, default: "placed" },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    deliveryFee: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["cash", "online"], default: "cash" },
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },

    // dine-in only
    table: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },
    guests: { type: Number, min: 1 },
    reservationTime: { type: Date },

    // delivery only
    deliveryAddress: {
      street: String,
      city: String,
      pincode: String,
      phone: String,
    },

    cancelReason: { type: String, trim: true },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);

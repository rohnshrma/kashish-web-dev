import express from "express";
import {
  getAllOrders,
  updateOrderStatus,
  markPaid,
} from "../controllers/adminController.js";
import { auth } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";
import { validateObjectId } from "../middleware/validate.js";

const router = express.Router();

router.use(auth, authorize("admin"));

router.get("/orders", getAllOrders);
router.patch("/orders/:id/status", validateObjectId("id"), updateOrderStatus);
router.patch("/orders/:id/payment", validateObjectId("id"), markPaid);

export default router;

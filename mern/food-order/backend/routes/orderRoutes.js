import express from "express";
import {
  placeOrder,
  getMyOrders,
  getOrder,
  cancelOrder,
} from "../controllers/orderController.js";
import { auth } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";
import { validateObjectId } from "../middleware/validate.js";

const router = express.Router();

router.use(auth, authorize("user"));

router.post("/", placeOrder);
router.get("/my", getMyOrders); // keep above "/:id"
router.get("/:id", validateObjectId("id"), getOrder);
router.patch("/:id/cancel", validateObjectId("id"), cancelOrder);

export default router;

import express from "express";
import {
  getCart,
  addToCart,
  updateQuantity,
  removeItem,
  clearCart,
} from "../controllers/cartController.js";
import { auth } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";
import { validateObjectId } from "../middleware/validate.js";

const router = express.Router();

router.use(auth, authorize("user"));

router.route("/").get(getCart).post(addToCart).delete(clearCart);
router
  .route("/:menuItemId")
  .put(validateObjectId("menuItemId"), updateQuantity)
  .delete(validateObjectId("menuItemId"), removeItem);

export default router;

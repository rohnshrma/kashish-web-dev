import express from "express";
import {
  getMenu,
  createMenuItem,
  updateMenuItem,
  toggleAvailability,
  deleteMenuItem,
} from "../controllers/menuController.js";
import { auth, optionalAuth } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";
import { validateObjectId } from "../middleware/validate.js";

const router = express.Router();

// public, but admin sees sold-out items too
router.get("/", optionalAuth, getMenu);

router.use(auth, authorize("admin"));

router.post("/", createMenuItem);
router.put("/:id", validateObjectId("id"), updateMenuItem);
router.patch("/:id/availability", validateObjectId("id"), toggleAvailability);
router.delete("/:id", validateObjectId("id"), deleteMenuItem);

export default router;

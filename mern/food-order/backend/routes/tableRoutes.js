import express from "express";
import { getAvailableTables } from "../controllers/tableController.js";
import { auth } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";

const router = express.Router();

router.get("/available", auth, authorize("user"), getAvailableTables);

export default router;

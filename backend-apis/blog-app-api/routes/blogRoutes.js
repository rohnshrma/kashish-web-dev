import { Router } from "express";
import {
  GET_BLOGS,
  ADD_BLOG,
  UPDATE_BLOG,
  REMOVE_BLOG,
} from "../controllers/blogController.js";
import { AUTH_MIDDLEWARE as PROTECT } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/").get(GET_BLOGS).post(PROTECT, ADD_BLOG);
router.route("/:id").put(PROTECT, UPDATE_BLOG).delete(PROTECT, REMOVE_BLOG);

export default router;

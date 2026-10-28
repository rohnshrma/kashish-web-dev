import express from "express";
import rateLimit from "express-rate-limit";
import { register, login, getMe } from "../controllers/authController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// slow down password guessing
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "failed",
    message: "Too many login attempts, please try again after 15 minutes",
    data: null,
  },
});

router.post("/register", register);
router.post("/login", loginLimiter, login);
router.get("/me", auth, getMe);

export default router;

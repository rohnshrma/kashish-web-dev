import { Router } from "express";
import { REGISTER_USER, LOGIN_USER } from "../controllers/authController.js";

const router = Router();

router.route("/register").post(REGISTER_USER);
router.route("/login").post(LOGIN_USER);

export default router;

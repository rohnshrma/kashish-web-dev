import { Router } from "express";

import {
  GET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from "../controllers/taskControllers.js";
const router = Router();

router.route("/").get(GET_TASKS).post(ADD_TASK);
router.route("/:id").delete(DELETE_TASK).put(UPDATE_TASK);

export default router;

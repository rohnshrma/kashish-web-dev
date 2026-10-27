import express from "express";

import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";

const router = express.Router();

router.route("/").get(getTodos).post(createTodo);

router.route("/:id").patch(updateTodo).delete(deleteTodo);

export default router;

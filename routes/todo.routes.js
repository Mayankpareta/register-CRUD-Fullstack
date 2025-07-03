import express from "express";
import {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo
} from "../controllers/todo.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
 
const router = express.Router();
 

router.use(protect);
router.post("/", createTodo);
router.get("/", getTodos);
router.get("/:id", getTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
 
export default router;
 
 
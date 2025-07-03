import express from "express";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  getProfile
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
 
const router = express.Router();
 
router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);
router.post("/getProfile", protect, getProfile);
 
export default router;
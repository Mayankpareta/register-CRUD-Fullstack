import express from "express";
import { requestPasswordReset, resetPassword } from "../controllers/forgetpassword.controller.js";

const router = express.Router();

router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password/:token", resetPassword);

export default router;

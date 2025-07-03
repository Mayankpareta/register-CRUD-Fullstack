import express from "express";
import {
  createQtyHead,
  getQtyHeads,
  getQtyHead,
  updateQtyHead,
  deleteQtyHead,
} from "../controllers/qtyhead.controller.js";

const router = express.Router();

router.post("/", createQtyHead);
router.get("/", getQtyHeads);
router.get("/:id", getQtyHead);
router.put("/:id", updateQtyHead);
router.delete("/:id", deleteQtyHead);

export default router;

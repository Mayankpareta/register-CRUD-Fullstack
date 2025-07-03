import express from "express";
import {
  createAddress,
  getAddresses,
  getAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/address.controller.js";

const router = express.Router();

router.post("/", createAddress);
router.get("/", getAddresses);
router.get("/:id", getAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

export default router;

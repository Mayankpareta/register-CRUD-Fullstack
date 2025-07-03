import express from "express";
import {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";

const router = express.Router();

router.post("/", createEvent);
router.get("/", getEvents);
router.get("/:id", getEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;

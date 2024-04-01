import express from "express";
import { addEvent, getEvents, getSingleEvent, getMyEvents } from "../controllers/event.js";

const router = express.Router()

router.post("/", addEvent)
router.get("/", getEvents)
router.get("/single", getSingleEvent)
router.get("/myevents", getMyEvents)

export default router
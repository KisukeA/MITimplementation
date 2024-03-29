import express from "express";
import { addEvent, getEvents, getSingleEvent } from "../controllers/event.js";

const router = express.Router()

router.post("/", addEvent)
router.get("/", getEvents)
router.get("/single", getSingleEvent)


export default router
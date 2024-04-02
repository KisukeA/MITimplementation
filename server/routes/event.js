import express from "express";
import { addEvent, getEvents, getFavoriteEvents, getUserEvents, getSingleEvent, getMyEvents, getSearchedEvents } from "../controllers/event.js";

const router = express.Router()

router.post("/", addEvent)
router.get("/", getEvents)
router.get("/favorite", getFavoriteEvents)
router.get("/single", getSingleEvent)
router.get("/myevents", getMyEvents)
router.get("/userevents/:id", getUserEvents)
router.get("/search", getSearchedEvents)

export default router
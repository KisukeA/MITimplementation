import express from "express";
import { addTicket, updateTicket, getTickets, getGoing, getStats } from "../controllers/ticket.js";

const router = express.Router()

router.get("/", getTickets);
router.get("/going", getGoing);
router.get("/stats", getStats);
router.post("/", addTicket);
router.put("/", updateTicket);

export default router
import express from "express";
import { addTicket, getTickets, getGoing } from "../controllers/ticket.js";

const router = express.Router()

router.get("/", getTickets);
router.get("/going", getGoing);
router.post("/", addTicket);

export default router
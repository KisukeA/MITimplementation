import express from "express";
import { addTicket, getGoing } from "../controllers/ticket.js";

const router = express.Router()

router.get("/", );
router.get("/going", getGoing);
router.post("/", addTicket);

export default router
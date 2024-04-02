import express from "express";
import { getUser, getSearchedUsers } from "../controllers/user.js";

const router = express.Router()

router.get("/search", getSearchedUsers);
router.get("/:userId", getUser);

export default router
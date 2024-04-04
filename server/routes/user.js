import express from "express";
import { getUser, updateUser, getSearchedUsers } from "../controllers/user.js";

const router = express.Router()

router.get("/search", getSearchedUsers);
router.get("/:userId", getUser);
router.put("/", updateUser);

export default router
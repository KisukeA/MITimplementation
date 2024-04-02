import express from "express";
import { addFollow, deleteFollow, getFollowers } from "../controllers/follow.js";

const router = express.Router()

router.get("/", getFollowers);
router.post("/", addFollow);
router.delete("/:followed", deleteFollow);

export default router
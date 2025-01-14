import { Router } from "express";
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} from "../controllers/follows.controller.js";

const router = Router();

router.post("/", followUser);
router.delete("/", unfollowUser);
router.get("/followers", getFollowers);
router.get("/following", getFollowing);

export default router;
